import React, { useState } from 'react';
import { Search, MapPin, Hash, Utensils } from 'lucide-react';

const RECOMMENDATIONS = [
  { id: 'f1', title: '沖繩麵 (Okinawa Soba)', tags: ['浜屋', '岸本食堂'], icon: '🍜' },
  { id: 'f2', title: '石垣牛燒肉', tags: ['燒肉乃我那霸', '琉球之牛'], icon: '🥩' },
  { id: 'f3', title: '塔可飯 (Taco Rice)', tags: ['King Tacos', '美國村'], icon: '🌮' },
  { id: 'f4', title: '海鮮丼', tags: ['糸滿魚市場', '泊港魚市場'], icon: '🐟' },
  { id: 'f5', title: '飯糰', tags: ['豬肉蛋飯糰', '機場店'], icon: '🍙' },
  { id: 'f6', title: '甜點', tags: ['Blue Seal', '安室養雞場布丁'], icon: '🍦' },
];

const FoodView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (platform: 'maps' | 'threads') => {
    if (!searchTerm.trim()) return;
    const query = encodeURIComponent(`${searchTerm} 沖繩 Okinawa food`);
    
    if (platform === 'maps') {
      window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
    } else {
      window.open(`https://www.threads.net/search?q=${query}`, '_blank');
    }
  };

  const handleTagClick = (tag: string) => {
    setSearchTerm(tag);
  };

  return (
    <div className="h-full overflow-y-auto p-4 md:p-8 bg-slate-50">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-slate-800 flex items-center justify-center gap-3">
            <Utensils className="text-orange-500" size={32} />
            沖繩美食搜查
          </h2>
          <p className="text-slate-500">探索在地美食，看看大家都在吃什麼！</p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-0 z-10">
          <div className="relative mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="輸入餐廳名稱或食物 (例: 暖暮拉麵)"
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-lg transition-all"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch('maps')}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => handleSearch('maps')}
              className="flex items-center justify-center gap-2 bg-blue-50 text-blue-600 font-bold py-3 rounded-xl hover:bg-blue-100 transition-colors"
            >
              <MapPin size={20} />
              找地圖評價
            </button>
            <button 
              onClick={() => handleSearch('threads')}
              className="flex items-center justify-center gap-2 bg-black text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-colors"
            >
              <Hash size={20} />
              搜 Threads 討論
            </button>
          </div>
        </div>

        {/* Quick Tags */}
        <div className="space-y-4">
          <h3 className="font-bold text-slate-700 ml-1">熱門搜尋</h3>
          <div className="flex flex-wrap gap-2">
            {['敘敘苑', '琉球之牛', '通堂拉麵', '幸福鬆餅', 'A&W', '傑克牛排'].map(tag => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className="px-4 py-2 bg-white border border-slate-200 rounded-full text-slate-600 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition-colors text-sm font-medium"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="space-y-4">
          <h3 className="font-bold text-slate-700 ml-1">必吃推薦清單</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RECOMMENDATIONS.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <h4 className="font-bold text-slate-800 text-lg">{item.title}</h4>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map(tag => (
                    <span 
                      key={tag} 
                      onClick={() => handleTagClick(tag)}
                      className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded cursor-pointer hover:bg-orange-100"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodView;
