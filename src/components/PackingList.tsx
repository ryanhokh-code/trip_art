import React, { useState, useEffect } from 'react';
import { INITIAL_PACKING_LIST } from '../constants';
import type { PackingItem } from '../types';
import { CheckSquare, Square, Baby, Users, Smartphone, Pill, FileText } from 'lucide-react';

const PackingList: React.FC = () => {
  const [items, setItems] = useState<PackingItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('okinawa_packing');
    if (saved) {
      setItems(JSON.parse(saved));
    } else {
      setItems(INITIAL_PACKING_LIST);
    }
  }, []);

  const toggleItem = (id: string) => {
    const newItems = items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(newItems);
    localStorage.setItem('okinawa_packing', JSON.stringify(newItems));
  };

  const getIcon = (cat: string) => {
    switch(cat) {
      case 'baby': return <Baby className="w-4 h-4 text-pink-500" />;
      case 'parents': return <Users className="w-4 h-4 text-teal-500" />;
      case 'tech': return <Smartphone className="w-4 h-4 text-yellow-500" />;
      case 'med': return <Pill className="w-4 h-4 text-green-500" />;
      default: return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const getCategoryName = (cat: string) => {
    const names: Record<string, string> = {
      baby: '寶寶必需 (愷蕎)',
      parents: '爸媽用品',
      tech: '3C 與電器',
      med: '醫療急救',
      doc: '重要文件'
    };
    return names[cat] || '其他';
  };

  const categories = Array.from(new Set(items.map(i => i.category)));
  const progress = Math.round((items.filter(i => i.checked).length / items.length) * 100);

  return (
    <div className="h-full overflow-y-auto p-4 bg-slate-50">
      <div className="max-w-6xl mx-auto h-full flex flex-col">
        {/* Progress Bar Header */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 mb-4 sticky top-0 z-10 shrink-0">
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-xl font-bold text-slate-800">行李清單</h2>
            <span className="text-sm font-bold text-blue-600">{progress}% 完成</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {/* Compact Masonry-like Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-20">
          {categories.map(cat => (
            <div key={cat} className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden h-fit break-inside-avoid">
              <div className="bg-slate-50 px-3 py-2 border-b border-slate-100 flex items-center gap-2">
                {getIcon(cat)}
                <h3 className="font-bold text-slate-700 text-sm">{getCategoryName(cat)}</h3>
              </div>
              <div className="divide-y divide-slate-50">
                {items.filter(i => i.category === cat).map(item => (
                  <div 
                    key={item.id} 
                    onClick={() => toggleItem(item.id)}
                    className={`px-3 py-2 flex items-start gap-3 cursor-pointer hover:bg-slate-50 transition-colors ${item.checked ? 'bg-slate-50/50' : ''}`}
                  >
                    <div className="mt-0.5 shrink-0">
                       {item.checked 
                        ? <CheckSquare className="w-4 h-4 text-blue-500" /> 
                        : <Square className="w-4 h-4 text-slate-300" />
                      }
                    </div>
                    <span className={`text-sm leading-tight ${item.checked ? 'text-slate-400 line-through' : 'text-slate-700 font-medium'}`}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackingList;
