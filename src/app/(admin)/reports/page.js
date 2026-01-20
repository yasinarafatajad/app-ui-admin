'use client'
import { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package, Calendar, Download } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';


const metrics = [
  { label: 'Total Revenue', value: '৳129,000', change: '+12.5%', positive: true, icon: DollarSign },
  { label: 'Total Orders', value: '1,234', change: '+8.2%', positive: true, icon: ShoppingCart },
  { label: 'New Customers', value: '156', change: '-2.4%', positive: false, icon: Users },
  { label: 'Products Sold', value: '3,456', change: '+15.3%', positive: true, icon: Package },
];

const weeklyData = [
  { today: 'Sun', sales: 4300, orders: 43 },
  { today: 'Mon', sales: 2400, orders: 24 },
  { today: 'Tue', sales: 1398, orders: 13 },
  { today: 'Wed', sales: 9800, orders: 98 },
  { today: 'Thu', sales: 3908, orders: 39 },
  { today: 'Fri', sales: 4800, orders: 48 },
  { today: 'Sat', sales: 3800, orders: 38 },
];

const topCategories = [
  { name: 'Electronics', sales: 45230, percentage: 35 },
  { name: 'Accessories', sales: 32150, percentage: 25 },
  { name: 'Clothing', sales: 25800, percentage: 20 },
  { name: 'Home & Garden', sales: 15600, percentage: 12 },
  { name: 'Other', sales: 10220, percentage: 8 },
];

 const metadata = {
    title: 'Reports | Admin Panel',
    description: 'weekly/monthly/yearly report analytics',
  };

const Reports = () => {
  const [period, setPeriod] = useState('week');
  const weeklyIndex = new Date().getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Reports"
        subtitle="Analytics overview"
        actions={
          <button onClick={() => window.print()} className="w-10 h-10 bg-card border border-input rounded-xl flex items-center justify-center hover:bg-secondary transition-colors">
            <Download className="w-5 h-5" />
          </button>
        }
      />

      <div className="px-4 py-4 md:px-6 md:py-6 space-y-6">
        {/* Period Selector */}
        <div className="flex gap-2 animate-fade-in">
          {['week', 'month', 'year'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${period === p
                ? 'bg-primary text-primary-foreground'
                : 'bg-card border border-input text-muted-foreground hover:text-foreground'
                }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 animate-fade-in" style={{ animationDelay: '50ms' }}>
          {metrics.map((metric, index) => (
            <div key={metric.label} className="bg-card rounded-xl p-4 shadow-card">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <metric.icon className="w-4 h-4 text-primary" />
                </div>
                <span className={`text-xs font-medium flex items-center gap-0.5 ${metric.positive ? 'text-success' : 'text-destructive'
                  }`}>
                  {metric.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {metric.change}
                </span>
              </div>
              <p className="text-xl font-bold">{metric.value}</p>
              <p className="text-xs text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </div>

        {/* Sales Chart */}
        <div className="bg-card rounded-xl p-4 shadow-card animate-fade-in" style={{ animationDelay: '100ms' }}>
          <h3 className="font-semibold mb-4">Weekly Sales</h3>

          <div className="h-48 md:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={weeklyData}
                barGap={6}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="var(--color-border)"
                />

                <XAxis
                  dataKey="today"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
                />

                {/* Revenue axis */}
                <YAxis
                  yAxisId="sales"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
                  tickFormatter={(v) => `৳${v / 1000}k`}
                />

                {/* Orders axis */}
                <YAxis
                  yAxisId="orders"
                  orientation="right"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
                />

                <Tooltip
                  cursor={{ fill: 'var(--color-secondary)' }}
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '0.75rem',
                  }}
                  labelStyle={{ fontWeight: 600 }}
                  formatter={(value, name) =>
                    name === 'sales'
                      ? [`৳${value.toLocaleString()}`, 'Revenue']
                      : [value, 'Orders']
                  }
                />

                {/* Revenue */}
                <Bar yAxisId="sales" dataKey="sales" radius={[6, 6, 0, 0]}>
                  {weeklyData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={
                        index === weeklyIndex
                          ? 'var(--color-primary)'
                          : 'var(--color-primary-half)'
                      }
                    />
                  ))}
                </Bar>

                {/* Orders */}
                <Bar yAxisId="orders" dataKey="orders" radius={[6, 6, 0, 0]}>
                  {weeklyData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={
                        index === weeklyIndex
                          ? 'var(--color-accent)'
                          : 'var(--color-muted)'
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary/50" />
              <span className="text-xs text-muted-foreground">Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-muted" />
              <span className="text-xs text-muted-foreground">Orders</span>
            </div>
          </div>
        </div>




        {/* Top Categories */}
        <div className="bg-card rounded-xl p-4 shadow-card animate-fade-in" style={{ animationDelay: '150ms' }}>
          <h3 className="font-semibold mb-4">Top Categories</h3>
          <div className="space-y-4">
            {topCategories.map((category, index) => (
              <div key={category.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">{category.name}</span>
                  <span className="text-sm font-medium">৳{(category.sales / 1000).toFixed(1)}k</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-700"
                    style={{
                      width: `${category.percentage}%`,
                      transitionDelay: `${index * 100}ms`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
