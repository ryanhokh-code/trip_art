import React, { useState } from 'react';
import Layout from './components/Layout';
import MapView from './components/MapView';
import ScheduleView from './components/ScheduleView';
import PackingList from './components/PackingList';
import ExpenseView from './components/ExpenseView';
import WeatherView from './components/WeatherView';
import CalculatorView from './components/CalculatorView';
import AiAssistant from './components/AiAssistant';
import FoodView from './components/FoodView';
import { Tab } from './types';
import { Plane } from 'lucide-react';

const FlightView = () => (
  <div className="p-8 h-full bg-slate-100 flex items-center justify-center">
    <div className="max-w-md w-full space-y-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-slate-800">✈️ 航班資訊</h2>
        
        {/* Ticket 1 */}
        <div className="bg-white rounded-2xl shadow-md border-l-8 border-orange-500 p-8 relative overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <div className="absolute right-[-20px] top-[-20px] p-2 opacity-5 pointer-events-none">
                <Plane size={150} />
            </div>
            
            <div className="flex justify-between items-center mb-6 border-b-2 border-dashed border-slate-100 pb-6">
                <div>
                    <span className="text-5xl font-black text-slate-800 tracking-tighter">TPE</span>
                    <p className="text-sm font-bold text-slate-500 mt-1">台北桃園</p>
                </div>
                <div className="flex flex-col items-center px-4">
                    <Plane className="text-orange-500 rotate-90 drop-shadow-sm" size={32} />
                    <span className="text-[10px] text-slate-400 font-bold mt-1">2h 10m</span>
                </div>
                <div className="text-right">
                    <span className="text-5xl font-black text-slate-800 tracking-tighter">OKA</span>
                    <p className="text-sm font-bold text-slate-500 mt-1">沖繩那霸</p>
                </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">DATE</p>
                    <p className="font-bold text-slate-800 text-lg">4/28</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-2">
                    <p className="text-[10px] font-bold text-orange-400 uppercase tracking-wider">FLIGHT</p>
                    <p className="font-black text-orange-600 text-lg">JX870</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">TIME</p>
                    <p className="font-bold text-slate-800 text-lg">09:30</p>
                </div>
            </div>
        </div>

         {/* Ticket 2 */}
         <div className="bg-white rounded-2xl shadow-md border-l-8 border-blue-500 p-8 relative overflow-hidden transform hover:scale-105 transition-transform duration-300">
             <div className="absolute right-[-20px] top-[-20px] p-2 opacity-5 pointer-events-none">
                <Plane size={150} />
            </div>

            <div className="flex justify-between items-center mb-6 border-b-2 border-dashed border-slate-100 pb-6">
                <div>
                    <span className="text-5xl font-black text-slate-800 tracking-tighter">OKA</span>
                    <p className="text-sm font-bold text-slate-500 mt-1">沖繩那霸</p>
                </div>
                 <div className="flex flex-col items-center px-4">
                    <Plane className="text-blue-500 -rotate-90 drop-shadow-sm" size={32} />
                     <span className="text-[10px] text-slate-400 font-bold mt-1">2h 30m</span>
                </div>
                <div className="text-right">
                    <span className="text-5xl font-black text-slate-800 tracking-tighter">TPE</span>
                    <p className="text-sm font-bold text-slate-500 mt-1">台北桃園</p>
                </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">DATE</p>
                    <p className="font-bold text-slate-800 text-lg">5/02</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-2">
                    <p className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">FLIGHT</p>
                    <p className="font-black text-blue-600 text-lg">JX871</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">TIME</p>
                    <p className="font-bold text-slate-800 text-lg">13:00</p>
                </div>
            </div>
        </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.MAP);

  const renderContent = () => {
    switch (activeTab) {
      case Tab.MAP: return <MapView />;
      case Tab.SCHEDULE: return <ScheduleView />;
      case Tab.FOOD: return <FoodView />;
      case Tab.FLIGHT: return <FlightView />;
      case Tab.PACK: return <PackingList />;
      case Tab.EXPENSE: return <ExpenseView />;
      case Tab.WEATHER: return <WeatherView />;
      case Tab.CALC: return <CalculatorView />;
//       case Tab.AI: return <AiAssistant />;
      default: return <div className="p-10 text-center">功能開發中...</div>;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;