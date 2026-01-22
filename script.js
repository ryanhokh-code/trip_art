// --- 1. Global State & Initialization ---
let expenses = JSON.parse(localStorage.getItem('okinawa_expenses')) || [];
let photoStatus = JSON.parse(localStorage.getItem('okinawa_photos')) || {};

document.addEventListener('DOMContentLoaded', () => {
    updateExpenseDisplay();
    loadPhotoStatus();
    fetchOkinawaWeather();
    initMapPins();
});

// --- 2. Tab Navigation ---
function openTab(evt, tabName) {
    const sections = document.getElementsByClassName("content-section");
    for (let i = 0; i < sections.length; i++) sections[i].classList.remove("active");
    const tabButtons = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < tabButtons.length; i++) tabButtons[i].classList.remove("active");
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

// --- 3. Map & Modal Logic ---
const spotData = {
    'kokusai': { t: '國際通', d: '愷蕎第一站!伴手禮與美食散步首選。' },
    'churaumi': { t: '水族館', d: '全日本最壯觀!看巨大的鯨鯊在黑潮之海。' },
    'manzamo': { t: '象鼻岩', d: '萬座毛標誌,家族大合照絕佳地點。' },
    'american': { t: '美國村', d: '異國情調,落日海灘散步最棒。' },
    'zoo': { t: '兒童王國', d: '愷蕎的動物探險,適合小朋友近距離觀察。' },
    'aeon': { t: 'Aeon Mall', d: '最大百貨,好逛、好買、還有大水族箱。' },
    'dmm': { t: 'DMM水族館', d: '高科技影像藝術,視覺效果極夢幻。' },
    'outlet': { t: 'Outlet', d: '把握最後血拼機會!超過100家品牌。' },
    'teamlab': { t: 'teamLab', d: '沈浸式光影藝術,愷蕎的互動畫畫。' },
    'airport': { t: '那霸機場', d: '帶著滿滿回憶,準備回家囉!' }
};

function initMapPins() {
    const pins = document.querySelectorAll('.pin');
    const modal = document.getElementById('infoModal');
    const mTitle = document.getElementById('modalTitle');
    const mDesc = document.getElementById('modalDesc');

    pins.forEach(pin => {
        pin.onclick = (e) => {
            e.stopPropagation();
            const id = pin.getAttribute('data-id');
            const spot = spotData[id];
            mTitle.innerText = spot.t;
            mDesc.innerText = spot.d;
            modal.style.display = 'flex';
        };
    });
}

function closeModal() { document.getElementById('infoModal').style.display = 'none'; }
window.onclick = (e) => { if (e.target == document.getElementById('infoModal')) closeModal(); };

// --- 4. Weather API Logic ---
async function fetchOkinawaWeather() {
    const lat = 26.212;
    const lon = 127.679;
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max&timezone=Asia%2FTokyo`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayWeather(data.daily);
        document.getElementById('weather-status').innerText = "數據來源: Open-Meteo (即時更新)";
    } catch (error) {
        document.getElementById('weather-status').innerText = "暫時無法取得天氣資訊。";
    }
}

function displayWeather(dailyData) {
    const grid = document.getElementById('dynamic-weather-grid');
    grid.innerHTML = '';
    const mapping = { 0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️', 45: '🌫️', 61: '🌧️', 80: '🌦️', 95: '⛈️' };

    for (let i = 0; i < 5; i++) {
        const date = new Date(dailyData.time[i]);
        const dayStr = `${date.getMonth() + 1}/${date.getDate()}`;
        const icon = mapping[dailyData.weather_code[i]] || '❓';
        grid.innerHTML += `
            <div class="weather-day">
                <h4>${dayStr}</h4>
                <div class="weather-icon">${icon}</div>
                <div class="weather-temp">${Math.round(dailyData.temperature_2m_max[i])}°C</div>
            </div>`;
    }
}

// --- 5. Expense Tracker ---
function addExpense() {
    const desc = document.getElementById("expenseDesc").value;
    const amount = parseInt(document.getElementById("expenseAmount").value);
    if (!desc || isNaN(amount)) return alert("請填寫內容與金額");
    expenses.push({ desc, amount });
    localStorage.setItem('okinawa_expenses', JSON.stringify(expenses));
    updateExpenseDisplay();
    document.getElementById("expenseDesc").value = "";
    document.getElementById("expenseAmount").value = "";
}

function deleteExpense(index) {
    if(confirm("確定刪除？")) {
        expenses.splice(index, 1);
        localStorage.setItem('okinawa_expenses', JSON.stringify(expenses));
        updateExpenseDisplay();
    }
}

function updateExpenseDisplay() {
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    document.getElementById("totalExpense").innerText = "¥" + total.toLocaleString();
    document.getElementById("expenseCount").innerText = expenses.length;
    document.getElementById("avgExpense").innerText = "¥" + Math.round(total/5).toLocaleString();
    document.getElementById("expenseList").innerHTML = expenses.map((e, i) => `
        <div class="expense-item">
            <span>${e.desc}</span>
            <span>¥${e.amount} <button onclick="deleteExpense(${i})">X</button></span>
        </div>`).join("");
}

// --- 6. Photo Checklist ---
function togglePhoto(card) {
    card.classList.toggle("checked");
    const photoTitle = card.querySelector('h4').innerText.replace('✓', '').trim();
    photoStatus[photoTitle] = card.classList.contains("checked");
    localStorage.setItem('okinawa_photos', JSON.stringify(photoStatus));
}

function loadPhotoStatus() {
    const photoCards = document.querySelectorAll('.photo-card');
    photoCards.forEach(card => {
        const title = card.querySelector('h4').innerText.replace('✓', '').trim();
        if (photoStatus[title]) card.classList.add("checked");
    });
}

// --- 7. Utilities (Currency & Countdown) ---
function convertCurrency() {
    const jpy = document.getElementById("jpyInput").value;
    document.getElementById("hkdResult").innerText = "≈ " + (jpy * 0.052).toFixed(2);
    document.getElementById("twdResult").innerText = "≈ " + (jpy * 0.22).toFixed(0);
}

const targetDate = new Date("April 28, 2026 09:30:00").getTime();
setInterval(() => {
    const now = new Date().getTime();
    const dist = targetDate - now;
    const d = Math.floor(dist / 86400000);
    const h = Math.floor((dist % 86400000) / 3600000);
    const m = Math.floor((dist % 3600000) / 60000);
    document.getElementById("timer").innerHTML = `${d}天 ${h}時 ${m}分`;
}, 1000);