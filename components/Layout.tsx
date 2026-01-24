import React from 'react';
import { Tab } from '../types';
import { Map, CalendarDays, Plane, Utensils, Briefcase, Calculator, CloudSun, Wallet, Camera, Sparkles } from 'lucide-react';

interface LayoutProps {
  activeTab: Tab;
  setActiveTab: (t: Tab) => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ activeTab, setActiveTab, children }) => {
  const navItems = [
    { id: Tab.MAP, icon: Map, label: '行程地圖' },
    { id: Tab.SCHEDULE, icon: CalendarDays, label: '詳細行程' },
    { id: Tab.FOOD, icon: Utensils, label: '美食' },
    { id: Tab.FLIGHT, icon: Plane, label: '航班' },
    { id: Tab.PACK, icon: Briefcase, label: '行李清單' },
    { id: Tab.CALC, icon: Calculator, label: '匯率' },
    { id: Tab.EXPENSE, icon: Wallet, label: '開支' },
    { id: Tab.WEATHER, icon: CloudSun, label: '天氣' },
    { id: Tab.AI, icon: Sparkles, label: 'AI 導遊', highlight: true },
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen bg-slate-100 overflow-hidden">
      {/* Sidebar Navigation (Desktop) */}
      <nav className="hidden md:flex flex-col w-64 bg-slate-900 text-slate-300 p-4 shrink-0">
        <div className="mb-8 px-4 py-2">
          <h1 className="text-xl font-bold text-white tracking-wider">OKINAWA <span className="text-orange-500">2026</span></h1>
        </div>
        <div className="space-y-2 flex-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id 
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30 font-bold' 
                  : 'hover:bg-slate-800 hover:text-white'
              } ${item.highlight && activeTab !== item.id ? 'text-purple-400 hover:bg-purple-900/30' : ''}`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile Navigation (Bottom Bar) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 flex justify-around p-2 pb-safe">
        {navItems.slice(0, 4).map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg ${activeTab === item.id ? 'text-orange-500' : 'text-slate-400'}`}
          >
            <item.icon size={20} />
            <span className="text-[10px]">{item.label}</span>
          </button>
        ))}
         <button
            onClick={() => setActiveTab(Tab.AI)}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg ${activeTab === Tab.AI ? 'text-purple-600' : 'text-purple-400'}`}
          >
            <Sparkles size={20} />
            <span className="text-[10px]">AI 導遊</span>
          </button>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden h-[calc(100vh-60px)] md:h-screen">
        {children}
      </main>
    </div>
  );
};

export default Layout;