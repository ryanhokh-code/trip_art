import React, { useState, useEffect } from 'react';
import { Expense } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Plus, Trash2, Wallet } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const ExpenseView: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newDesc, setNewDesc] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [category, setCategory] = useState('Food');

  useEffect(() => {
    const saved = localStorage.getItem('okinawa_expenses');
    if (saved) setExpenses(JSON.parse(saved));
  }, []);

  const saveExpenses = (newExp: Expense[]) => {
    setExpenses(newExp);
    localStorage.setItem('okinawa_expenses', JSON.stringify(newExp));
  };

  const addExpense = () => {
    if (!newDesc || !newAmount) return;
    const expense: Expense = {
      id: Date.now().toString(),
      desc: newDesc,
      amount: parseInt(newAmount),
      category
    };
    saveExpenses([...expenses, expense]);
    setNewDesc('');
    setNewAmount('');
  };

  const deleteExpense = (id: string) => {
    saveExpenses(expenses.filter(e => e.id !== id));
  };

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  
  // Aggregate data for Pie Chart
  const chartData = Object.values(expenses.reduce((acc, curr) => {
    if (!acc[curr.category]) acc[curr.category] = { name: curr.category, value: 0 };
    acc[curr.category].value += curr.amount;
    return acc;
  }, {} as Record<string, {name: string, value: number}>));

  return (
    <div className="h-full overflow-y-auto p-4 md:p-8 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3">
          <Wallet className="w-8 h-8 text-indigo-500" />
          開支記錄
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Summary & Chart */}
          <div className="space-y-6">
            <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg">
              <p className="text-indigo-200 text-sm font-medium uppercase tracking-wider">總花費 (JPY)</p>
              <h3 className="text-4xl font-bold mt-2">¥ {total.toLocaleString()}</h3>
              <p className="mt-4 text-sm opacity-80">平均每日: ¥ {Math.round(total / 5).toLocaleString()}</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-[300px]">
              <h4 className="font-bold text-slate-700 mb-4">分類統計</h4>
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `¥${value.toLocaleString()}`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-400">尚無資料</div>
              )}
            </div>
          </div>

          {/* Input & List */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[500px]">
            <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="項目 (如: 拉麵)"
                  className="flex-1 p-2 border rounded-lg text-sm"
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                />
                <select 
                  className="p-2 border rounded-lg text-sm bg-white"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                >
                  <option value="Food">飲食</option>
                  <option value="Transport">交通</option>
                  <option value="Shopping">購物</option>
                  <option value="Ticket">門票</option>
                  <option value="Other">其他</option>
                </select>
              </div>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="金額 (JPY)"
                  className="flex-1 p-2 border rounded-lg text-sm"
                  value={newAmount}
                  onChange={e => setNewAmount(e.target.value)}
                />
                <button 
                  onClick={addExpense}
                  className="bg-indigo-600 text-white px-4 rounded-lg hover:bg-indigo-700 flex items-center gap-1"
                >
                  <Plus size={16} /> 新增
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {expenses.map((exp) => (
                <div key={exp.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100 group">
                  <div>
                    <p className="font-bold text-slate-700">{exp.desc}</p>
                    <span className="text-xs text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">{exp.category}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-slate-600">¥{exp.amount.toLocaleString()}</span>
                    <button 
                      onClick={() => deleteExpense(exp.id)}
                      className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              {expenses.length === 0 && <p className="text-center text-slate-400 mt-10">開始記錄你的第一筆開支吧！</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseView;