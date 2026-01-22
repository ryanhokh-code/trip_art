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
// --- Live Currency Logic ---
let exchangeRates = {
    HKD: 0.052, // Fallback rates
    TWD: 0.22
};

async function fetchLiveExchangeRates() {
    const updateLabel = document.getElementById('fx-update-time');
    const rateHkdLabel = document.getElementById('rate-hkd');
    const rateTwdLabel = document.getElementById('rate-twd');

    const url = `https://open.er-api.com/v6/latest/JPY`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.result === "success") {
            exchangeRates.HKD = data.rates.HKD;
            exchangeRates.TWD = data.rates.TWD;

            // Update the quote labels
            rateHkdLabel.innerText = exchangeRates.HKD.toFixed(4);
            rateTwdLabel.innerText = exchangeRates.TWD.toFixed(3);

            const date = new Date(data.time_last_update_utc).toLocaleDateString();
            updateLabel.innerText = `最後更新: ${date} (來源: ExchangeRate-API)`;
        } else {
            throw new Error("API Error");
        }
    } catch (error) {
        console.error("FX Fetch failed:", error);
        updateLabel.innerText = "* 無法取得即時匯率，使用預設值。";
        // Show fallback rates in the quote boxes
        rateHkdLabel.innerText = "0.0520";
        rateTwdLabel.innerText = "0.220";
    }
}

// Update your conversion function to use the live rates
function convertCurrency() {
    const jpy = document.getElementById("jpyInput").value;
    if (!jpy) {
        document.getElementById("hkdResult").innerText = "≈ 0.00";
        document.getElementById("twdResult").innerText = "≈ 0.00";
        return;
    }

    const hkd = (jpy * exchangeRates.HKD).toFixed(2);
    const twd = (jpy * exchangeRates.TWD).toFixed(0);

    document.getElementById("hkdResult").innerText = "≈ " + parseFloat(hkd).toLocaleString();
    document.getElementById("twdResult").innerText = "≈ " + parseInt(twd).toLocaleString();
}

// Ensure this is called in your DOMContentLoaded listener
document.addEventListener('DOMContentLoaded', () => {
    // ... your other init functions ...
    fetchLiveExchangeRates();
});


// --- Countdown Timer Logic ---
const targetDate = new Date("April 28, 2026 09:30:00").getTime();
setInterval(() => {
    const now = new Date().getTime();
    const dist = targetDate - now;
    const d = Math.floor(dist / 86400000);
    const h = Math.floor((dist % 86400000) / 3600000);
    const m = Math.floor((dist % 3600000) / 60000);
    document.getElementById("timer").innerHTML = `${d}天 ${h}時 ${m}分`;
}, 1000);


// --- 8. Fuunction to read Threads posts
// Add this to your DOMContentLoaded listener in script.js
document.addEventListener('DOMContentLoaded', () => {
    // ... your existing init functions ...
    updateDailyThread();
});
// --- Threads Logic with Stability Fallback ---

async function updateDailyThread() {
    const threadContainer = document.getElementById('threads-content');
    const threadDateLabel = document.getElementById('threads-date');

    const lastUpdate = localStorage.getItem('threads_last_update');
    const cachedData = localStorage.getItem('threads_data');
    const now = new Date().getTime();

    // Check for 24-hour cache (86,400,000 ms)
    if (lastUpdate && (now - lastUpdate < 86400000) && cachedData) {
        renderThread(JSON.parse(cachedData));
        threadDateLabel.innerText = "最後更新日期: " + new Date(parseInt(lastUpdate)).toLocaleDateString();
        return;
    }

    // Using a more stable community instance of RSSHub
    const rssUrl = encodeURIComponent('https://rsshub.diygod.me/threads/hashtag/okinawa');
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`;

    try {
        const response = await fetch(apiUrl);

        // If the server returns a 500 or 404, jump to catch block
        if (!response.ok) throw new Error('Source API Offline');

        const data = await response.json();

        if (data.status === 'ok' && data.items && data.items.length > 0) {
            const latestPost = data.items[0];
            const threadInfo = {
                author: latestPost.author || 'Okinawa_Traveler',
                content: latestPost.description.replace(/<[^>]*>?/gm, '').substring(0, 120) + "...",
                link: latestPost.link,
                isError: false
            };

            localStorage.setItem('threads_data', JSON.stringify(threadInfo));
            localStorage.setItem('threads_last_update', now.toString());

            renderThread(threadInfo);
            threadDateLabel.innerText = "最後更新日期: " + new Date().toLocaleDateString();
        } else {
            showFallback();
        }
    } catch (error) {
        console.error("Threads Fetch Error:", error);
        showFallback();
    }
}

function renderThread(data) {
    const threadContainer = document.getElementById('threads-content');

    // If we have real data, show the post
    threadContainer.innerHTML = `
        <div class="thread-post">
            <p><strong>@${data.author}</strong></p>
            <p>${data.content}</p>
            <a href="${data.link}" target="_blank" class="thread-link">查看完整 Threads 貼文 →</a>
        </div>
    `;
}

function showFallback() {
    const threadContainer = document.getElementById('threads-content');
    // Display a manual search link if the API fails
    threadContainer.innerHTML = `
        <div class="thread-post" style="text-align: center; border: 1px dashed #555; background: #111;">
            <p style="color: #bbb;">📴 目前無法取得自動更新</p>
            <p style="font-size: 12px; margin-bottom: 10px;">Threads 官方目前限制了外部讀取。</p>
            <a href="https://www.threads.net/search?q=%23okinawa" target="_blank" class="thread-link" style="border: 1px solid #1da1f2; padding: 5px 10px; border-radius: 20px;">
                點此查看 #okinawa 實時動態
            </a>
        </div>
    `;
}