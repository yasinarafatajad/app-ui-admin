"use client"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const salesData = [
  { name: 'Sun', sales: 4200 },
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 5000 },
  { name: 'Thu', sales: 4500 },
  { name: 'Fri', sales: 6000 },
  { name: 'Sat', sales: 5500 },
];
const todayIndex = new Date().getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat

const SalesBarChart = () => {
  return (
    <div className="bg-card rounded-xl shadow-card p-4 md:p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-sm md:text-base">Weekly Sales</h3>
          <p className="text-xs text-muted-foreground">Last 7 days performance</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-lg md:text-xl">৳32,200</p>
          <p className="text-xs text-success">+12.5% vs last week</p>
        </div>
      </div>
      <div className="h-48 md:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
              tickFormatter={(value) => `৳${value / 1000}k`}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '0.75rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              }}
              labelStyle={{ color: 'var(--color-foreground)', fontWeight: 600 }}
              formatter={(value) => [`৳${value.toLocaleString()}`, 'Sales']}
            />
            <Bar dataKey="sales" radius={[6, 6, 0, 0]}>
              {salesData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={index === todayIndex ? 'var(--color-primary)' : 'var(--color-primary-half)'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesBarChart;
