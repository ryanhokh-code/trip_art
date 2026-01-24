import type { DailySchedule, PackingItem, PhotoSpot, PinData } from './types';

export const SCHEDULE_DATA: DailySchedule[] = [
  {
    date: '4/28',
    day: '週二',
    events: [
      { time: '11:50', title: '那霸機場抵達', mapLink: 'https://www.google.com/maps/search/?api=1&query=Naha+Airport' },
      { time: '13:00', title: 'OTS 租車', mapLink: 'https://www.google.com/maps/search/?api=1&query=OTS+Rent-a-car+Naha' },
      { time: '14:00', title: '飯店 Check-in', mapLink: 'https://www.google.com/maps/search/?api=1&query=Okinawa+Hotel' },
      { time: '16:00', title: '國際通散策', isHighlight: true, mapLink: 'https://www.google.com/maps/search/?api=1&query=Kokusai+Dori' },
      { time: '18:30', title: '暖暮拉麵', mapLink: 'https://www.google.com/maps/search/?api=1&query=Danbo+Ramen+Naha' },
    ]
  },
  {
    date: '4/29',
    day: '週三',
    events: [
      { time: '09:00', title: '萬座毛 (象鼻岩)', mapLink: 'https://www.google.com/maps/search/?api=1&query=Manzamo' },
      { time: '11:30', title: '美麗海水族館', isHighlight: true, mapLink: 'https://www.google.com/maps/search/?api=1&query=Churaumi+Aquarium' },
      { time: '15:00', title: '古宇利島大橋', mapLink: 'https://www.google.com/maps/search/?api=1&query=Kouri+Bridge' },
      { time: '17:00', title: '美國村落日', mapLink: 'https://www.google.com/maps/search/?api=1&query=American+Village+Okinawa' },
    ]
  },
  {
    date: '4/30',
    day: '週四',
    events: [
      { time: '10:00', title: '沖繩兒童王國', mapLink: 'https://www.google.com/maps/search/?api=1&query=Okinawa+Zoo+Museum' },
      { time: '12:30', title: '午餐: 琉球村', mapLink: 'https://www.google.com/maps/search/?api=1&query=Ryukyu+Mura' },
      { time: '14:00', title: '永旺夢樂城 Aeon', isHighlight: true, mapLink: 'https://www.google.com/maps/search/?api=1&query=Aeon+Mall+Okinawa+Rycom' },
    ]
  },
  {
    date: '5/01',
    day: '週五',
    events: [
      { time: '10:00', title: 'DMM 水族館', isHighlight: true, mapLink: 'https://www.google.com/maps/search/?api=1&query=DMM+Kariyushi+Aquarium' },
      { time: '13:00', title: '糸滿魚市場', mapLink: 'https://www.google.com/maps/search/?api=1&query=Itoman+Fish+Market' },
      { time: '14:00', title: 'Ashibinaa Outlet', mapLink: 'https://www.google.com/maps/search/?api=1&query=Ashibinaa+Outlet' },
    ]
  },
  {
    date: '5/02',
    day: '週六',
    events: [
      { time: '09:30', title: 'teamLab 展覽', isHighlight: true, mapLink: 'https://www.google.com/maps/search/?api=1&query=teamLab+Future+Park+Okinawa' },
      { time: '11:00', title: '前往機場/還車', mapLink: 'https://www.google.com/maps/search/?api=1&query=Naha+Airport' },
      { time: '13:00', title: '搭機返台' },
    ]
  }
];

export const INITIAL_PACKING_LIST: PackingItem[] = [
  // Baby
  { id: 'b1', text: '上衣/褲子 (6套)', category: 'baby', checked: false },
  { id: 'b2', text: '外套/背心', category: 'baby', checked: false },
  { id: 'b3', text: '奶粉 (足量+備用)', category: 'baby', checked: false },
  { id: 'b4', text: '奶瓶/奶嘴/刷子', category: 'baby', checked: false },
  { id: 'b5', text: '保溫瓶/水杯', category: 'baby', checked: false },
  { id: 'b6', text: '尿布 (40片)', category: 'baby', checked: false },
  { id: 'b7', text: '濕紙巾 (大包x2)', category: 'baby', checked: false },
  { id: 'b8', text: '屁屁膏/乳液', category: 'baby', checked: false },
  { id: 'b9', text: '圍兜/口水巾', category: 'baby', checked: false },
  { id: 'b10', text: '推車/背巾', category: 'baby', checked: false },
  { id: 'b11', text: '安撫玩具', category: 'baby', checked: false },
  { id: 'b12', text: '寶寶零食', category: 'baby', checked: false },
  
  // Parents
  { id: 'p1', text: '換洗衣物 (5天份)', category: 'parents', checked: false },
  { id: 'p2', text: '內衣褲/襪子', category: 'parents', checked: false },
  { id: 'p3', text: '睡衣', category: 'parents', checked: false },
  { id: 'p4', text: '薄外套/遮陽帽', category: 'parents', checked: false },
  { id: 'p5', text: '好走的鞋', category: 'parents', checked: false },
  { id: 'p6', text: '盥洗包 (牙刷/牙膏)', category: 'parents', checked: false },
  { id: 'p7', text: '化妝品/保養品', category: 'parents', checked: false },
  { id: 'p8', text: '防曬乳/太陽眼鏡', category: 'parents', checked: false },
  { id: 'p9', text: '刮鬍刀', category: 'parents', checked: false },
  
  // Tech
  { id: 't1', text: '手機/充電線', category: 'tech', checked: false },
  { id: 't2', text: '行動電源', category: 'tech', checked: false },
  { id: 't3', text: 'Wifi機/Sim卡', category: 'tech', checked: false },
  { id: 't4', text: '相機/記憶卡', category: 'tech', checked: false },
  { id: 't5', text: '萬用轉接頭 (日本雙扁腳)', category: 'tech', checked: false },
  
  // Med
  { id: 'm1', text: '退燒藥 (大人/小孩)', category: 'med', checked: false },
  { id: 'm2', text: '體溫計', category: 'med', checked: false },
  { id: 'm3', text: '益生菌/腸胃藥', category: 'med', checked: false },
  { id: 'm4', text: 'OK繃/外傷藥膏', category: 'med', checked: false },
  { id: 'm5', text: '防蚊液/止癢膏', category: 'med', checked: false },
  
  // Doc
  { id: 'd1', text: '護照 (3本, 效期>6月)', category: 'doc', checked: false },
  { id: 'd2', text: '駕照日文譯本+正本', category: 'doc', checked: false },
  { id: 'd3', text: '機票/住宿憑證 (電子/紙本)', category: 'doc', checked: false },
  { id: 'd4', text: '旅遊保險單', category: 'doc', checked: false },
  { id: 'd5', text: 'Visit Japan Web QR Code', category: 'doc', checked: false },
  { id: 'd6', text: '日幣現金/信用卡', category: 'doc', checked: false },
];

export const MAP_PINS: PinData[] = [
  { id: 'kokusai', label: '國際通', desc: '愷蕎第一站!伴手禮與美食散步首選。', top: '70%', left: '25%' },
  { id: 'churaumi', label: '水族館', desc: '全日本最壯觀!看巨大的鯨鯊在黑潮之海。', top: '20%', left: '45%' },
  { id: 'manzamo', label: '象鼻岩', desc: '萬座毛標誌,家族大合照絕佳地點。', top: '32%', left: '50%' },
  { id: 'american', label: '美國村', desc: '異國情調,落日海灘散步最棒。', top: '50%', left: '24%' },
  { id: 'zoo', label: '兒童王國', desc: '愷蕎的動物探險,適合小朋友近距離觀察。', top: '50%', left: '35%' },
  { id: 'aeon', label: 'Aeon', desc: '最大百貨,好逛、好買、還有大水族箱。', top: '42%', left: '42%' },
  { id: 'dmm', label: 'DMM', desc: '高科技影像藝術,視覺效果極夢幻。', top: '82%', left: '12%' },
  { id: 'outlet', label: 'Outlet', desc: '把握最後血拼機會!超過100家品牌。', top: '85%', left: '15%' },
  { id: 'teamlab', label: 'teamLab', desc: '沈浸式光影藝術,愷蕎的互動畫畫。', top: '70%', left: '30%' },
  { id: 'airport', label: '機場', desc: '帶著滿滿回憶,準備回家囉!', top: '75%', left: '10%' },
];

export const INITIAL_PHOTOS: PhotoSpot[] = [
  { id: 'ph1', title: '愷蕎在國際通', desc: '第一站紀念照', checked: false },
  { id: 'ph2', title: '水族館鯨鯊', desc: '黑潮之海前全家合照', checked: false },
  { id: 'ph3', title: '象鼻岩背景', desc: '萬座毛經典角度', checked: false },
  { id: 'ph4', title: '美國村摩天輪', desc: '夕陽+家族', checked: false },
  { id: 'ph5', title: '愷蕎看動物', desc: '兒童王國互動時刻', checked: false },
  { id: 'ph6', title: 'teamLab 光影', desc: '互動藝術沉浸照', checked: false },
  { id: 'ph7', title: '機場起飛照', desc: '星宇航空窗外景色', checked: false },
];