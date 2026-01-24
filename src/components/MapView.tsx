import React, { useState } from 'react';
import { MAP_PINS, SCHEDULE_DATA } from '../constants';
import { MapPin, X } from 'lucide-react';
import type { PinData } from '../types';

const MapView: React.FC = () => {
  const [selectedPin, setSelectedPin] = useState<PinData | null>(null);

  // Generate summary from real data
  const scheduleSummary = SCHEDULE_DATA.map(day => {
    // Try to find a highlight event, otherwise the first event
    const mainEvent = day.events.find(e => e.isHighlight) || day.events[0];
    return {
      day: day.day,
      date: day.date,
      title: mainEvent.title
    };
  });

  return (
    <div className="w-full h-full bg-blue-50 overflow-hidden rounded-xl shadow-inner border-4 border-white flex flex-col">
      {/* Map Area - Takes remaining space */}
      <div className="relative flex-1 w-full overflow-hidden bg-slate-200">
        {/* Background Map Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-90"
          style={{ backgroundImage: "url('https://iili.io/fULDeb1.png')" }}
        />
        
        {/* Header Overlay */}
        <div className="absolute top-6 left-6 z-10 pointer-events-none">
          <h1 className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full text-2xl font-bold text-gray-800 border-2 border-orange-400 shadow-lg pointer-events-auto">
            28/4-2/5 家族旅行 <span className="text-orange-500 text-sm block md:inline md:ml-2">aka 愷蕎First Trip</span>
          </h1>
        </div>

        {/* Interactive Pins */}
        {MAP_PINS.map((pin) => (
          <button
            key={pin.id}
            onClick={() => setSelectedPin(pin)}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-20 transition-all hover:scale-110"
            style={{ top: pin.top, left: pin.left }}
          >
            <div className="relative">
              <div className="w-8 h-8 bg-orange-500 rounded-full border-2 border-white flex items-center justify-center shadow-md animate-bounce">
                 <MapPin className="w-5 h-5 text-white" />
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 bg-white px-2 py-0.5 rounded text-xs font-bold text-gray-700 whitespace-nowrap shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                {pin.label}
              </div>
            </div>
          </button>
        ))}

        {/* Modal Popup */}
        {selectedPin && (
          <div className="absolute inset-0 bg-black/40 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl relative border-t-8 border-orange-400">
              <button 
                onClick={() => setSelectedPin(null)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 bg-gray-100 rounded-full p-1"
              >
                <X size={20} />
              </button>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedPin.label}</h2>
              <p className="text-gray-600 leading-relaxed">{selectedPin.desc}</p>
              <div className="mt-4 flex justify-end">
                 <a 
                   href={`https://www.google.com/maps/search/?api=1&query=${selectedPin.label}+Okinawa`} 
                   target="_blank" 
                   rel="noreferrer"
                   className="text-sm font-semibold text-blue-500 hover:underline flex items-center gap-1"
                 >
                   在 Google 地圖查看 &rarr;
                 </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Schedule Summary Bottom Bar - Fixed height relative to content */}
      <div className="w-full bg-white/95 backdrop-blur-md border-t-4 border-orange-400 p-4 flex overflow-x-auto gap-4 z-30 shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        {scheduleSummary.map((item, i) => (
          <div key={i} className="min-w-[140px] bg-orange-50 rounded-lg p-3 text-center border border-orange-100 shadow-sm flex-shrink-0 flex flex-col justify-center">
            <h3 className="font-bold text-orange-600 text-sm">{item.date} {item.day}</h3>
            <p className="text-xs text-gray-700 font-medium mt-1 line-clamp-2">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapView;
