import React from 'react';
import { SCHEDULE_DATA } from '../constants';
import { MapPin, Clock, Calendar } from 'lucide-react';

const ScheduleView: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto p-4 md:p-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center gap-3">
            <Calendar className="w-8 h-8 text-orange-500" />
            <h2 className="text-3xl font-bold text-slate-800">5日行程總覽</h2>
        </div>
        
        {/* Grid Layout for Parallel View */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {SCHEDULE_DATA.map((day, index) => (
            <div key={index} className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-slate-800 text-white px-4 py-3 text-center">
                <span className="block font-bold text-xl">{day.date}</span>
                <span className="inline-block bg-slate-700 px-3 py-0.5 rounded-full text-xs mt-1">{day.day}</span>
              </div>
              
              <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
                <div className="space-y-6 relative">
                  {/* Timeline Line */}
                  <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-slate-100"></div>
                  
                  {day.events.map((event, eIndex) => (
                    <div key={eIndex} className="relative flex gap-3 pl-1">
                      {/* Dot */}
                      <div className={`z-10 w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 border-2 border-white shadow-sm ${event.isHighlight ? 'bg-orange-500' : 'bg-blue-400'}`}>
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold mb-1">
                          <Clock size={12} />
                          {event.time}
                        </div>
                        <div className={`p-3 rounded-lg border ${event.isHighlight ? 'bg-orange-50 border-orange-100' : 'bg-slate-50 border-slate-100'}`}>
                          <h4 className={`font-bold text-sm leading-tight ${event.isHighlight ? 'text-orange-700' : 'text-slate-800'}`}>
                            {event.title}
                          </h4>
                          {event.mapLink && (
                            <a 
                              href={event.mapLink}
                              target="_blank" 
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 mt-2 text-[10px] font-bold text-blue-500 hover:text-blue-700 uppercase tracking-wide bg-white px-2 py-1 rounded border border-blue-100 hover:border-blue-200 transition-colors"
                            >
                              <MapPin size={10} />
                              導航
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleView;