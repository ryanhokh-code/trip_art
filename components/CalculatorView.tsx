import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, RefreshCcw, DollarSign } from 'lucide-react';

const CalculatorView: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const [chartData, setChartData] = useState<any[]>([]);
  
  // Simulated Exchange Rates
  const RATES = { HKD: 0.052, TWD: 0.22 };

  useEffect(() => {
    // Generate mock historical data for the chart (last 365 days)
    const data = [];
    const baseTwd = 0.215;
    const baseHkd = 0.051;
    for (let i = 365; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      // Add some random fluctuation and trend
      const trend = Math.sin(i / 50) * 0.01;
      const noiseTwd = Math.random() * 0.005;
      const noiseHkd = Math.random() * 0.001;

      data.push({
        date: `${date.getMonth() + 1}/${date.getDate()}`,
        TWD: parseFloat((baseTwd + trend + noiseTwd).toFixed(4)),
        HKD: parseFloat((baseHkd + (trend * 0.23) + noiseHkd).toFixed(4)),
      });
    }
    setChartData(data);
  }, []);

  return (
    <div className="h-full overflow-y-auto p-4 md:p-8 bg-slate-50">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <DollarSign className="w-8 h-8 text-green-500" />
          匯率換算 & 走勢
        </h2>

        {/* Converter Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="mb-4 bg-yellow-50 text-yellow-800 px-4 py-2 rounded-lg text-sm flex items-center gap-2 border border-yellow-100">
             <RefreshCcw size={16} /> 即時匯率: 1 JPY ≈ {RATES.TWD} TWD / {RATES.HKD} HKD
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-1">日圓 (JPY)</label>
              <input 
                type="number" 
                value={amount || ''} 
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="輸入金額"
                className="w-full text-2xl font-mono p-3 border-2 border-slate-200 rounded-lg focus:border-green-500 focus:outline-none"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="block text-xs text-slate-500 uppercase font-bold">港幣 (HKD)</span>
                <span className="block text-2xl font-bold text-slate-800 mt-1">
                  $ {(amount * RATES.HKD).toFixed(2)}
                </span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="block text-xs text-slate-500 uppercase font-bold">台幣 (TWD)</span>
                <span className="block text-2xl font-bold text-slate-800 mt-1">
                  $ {(amount * RATES.TWD).toFixed(0)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
            <TrendingUp size={20} className="text-blue-500" />
            近1年匯率走勢 (TWD & HKD)
          </h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="date" 
                  stroke="#94a3b8" 
                  fontSize={10} 
                  tickMargin={10} 
                  interval={30} // Show label every ~30 days
                />
                
                {/* Left Axis for TWD */}
                <YAxis 
                  yAxisId="left" 
                  domain={['auto', 'auto']} 
                  stroke="#3b82f6" 
                  fontSize={12}
                  label={{ value: 'TWD', angle: -90, position: 'insideLeft', fill: '#3b82f6' }}
                />
                
                {/* Right Axis for HKD */}
                <YAxis 
                  yAxisId="right" 
                  orientation="right" 
                  domain={['auto', 'auto']} 
                  stroke="#10b981" 
                  fontSize={12}
                  label={{ value: 'HKD', angle: 90, position: 'insideRight', fill: '#10b981' }}
                />

                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ color: '#64748b' }}
                />
                <Legend />
                
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="TWD" 
                  name="台幣 (TWD)"
                  stroke="#3b82f6" 
                  strokeWidth={2} 
                  dot={false} 
                  activeDot={{ r: 6 }} 
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="HKD" 
                  name="港幣 (HKD)"
                  stroke="#10b981" 
                  strokeWidth={2} 
                  dot={false} 
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-xs text-slate-400 mt-2">資料來源: Historical Forex Mock Data</p>
        </div>
      </div>
    </div>
  );
};

export default CalculatorView;