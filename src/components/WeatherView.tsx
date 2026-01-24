import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, CloudLightning, CloudFog, Loader } from 'lucide-react';

const WeatherView: React.FC = () => {
  const [weather, setWeather] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const lat = 26.212; // Naha
        const lon = 127.679;
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo`);
        const data = await res.json();
        
        const daily = data.daily;
        const formatted = daily.time.slice(0, 5).map((t: string, i: number) => ({
          date: new Date(t).toLocaleDateString('zh-TW', { month: 'numeric', day: 'numeric' }),
          code: daily.weather_code[i],
          max: daily.temperature_2m_max[i],
          min: daily.temperature_2m_min[i]
        }));
        setWeather(formatted);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  const getWeatherIcon = (code: number) => {
    if (code <= 1) return <Sun className="w-10 h-10 text-orange-500" />;
    if (code <= 3) return <Cloud className="w-10 h-10 text-slate-400" />;
    if (code <= 48) return <CloudFog className="w-10 h-10 text-slate-500" />;
    if (code <= 80) return <CloudRain className="w-10 h-10 text-blue-500" />;
    return <CloudLightning className="w-10 h-10 text-purple-500" />;
  };

  return (
    <div className="h-full p-4 md:p-8 bg-blue-50 flex items-center justify-center">
      <div className="max-w-4xl w-full">
        <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">☀️ 那霸天氣預報</h2>
        
        {loading ? (
          <div className="flex justify-center p-12">
            <Loader className="animate-spin text-blue-500" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {weather?.map((day, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100 flex flex-col items-center gap-3 transition-transform hover:-translate-y-1">
                <span className="text-slate-500 font-bold">{day.date}</span>
                {getWeatherIcon(day.code)}
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-800">{Math.round(day.max)}°</div>
                  <div className="text-sm text-slate-400">{Math.round(day.min)}°</div>
                </div>
              </div>
            ))}
          </div>
        )}
        <p className="text-center text-xs text-slate-400 mt-8">資料來源: Open-Meteo API</p>
      </div>
    </div>
  );
};

export default WeatherView;