import {
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';
import StatsCard from '../../../components/ui/StatsCard';
import SalesBarChart from '../../../components/charts/SalesBarChart';
import CategoryPieChart from '../../../components/charts/CategoryPieChart';
import Link from 'next/link';
import OrderRow from '../../../components/ui/OrderRow';
import Image from 'next/image';
import PageHeader from '@/components/layout/PageHeader';
// import PageHeader from '../../../components/layout/PageHeader';

export const metadata = {
  title: 'Dashboard | Admin Panel',
  description: 'Admin dashboard overview and analytics',
};

const dashboard = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: '৳45,231',
      change: '+20.1%',
      changeType: 'positive',
      icon: DollarSign,
    },
    {
      title: 'Orders',
      value: '356',
      change: '-12.5%',
      changeType: 'negative',
      icon: ShoppingCart,
    },
    {
      title: 'Products',
      value: '128',
      change: '+3.2%',
      changeType: 'positive',
      icon: Package,
    },
    {
      title: 'Customers',
      value: '2,350',
      change: '+8.1%',
      changeType: 'positive',
      icon: Users,
    },
  ];

  const recentOrders = [
    {
      id: '3210',
      customer: 'John Smith',
      items: 3,
      total: '129.99',
      status: 'processing',
      date: 'Today, 2:30 PM',
    },
    {
      id: '3209',
      customer: 'Sarah Johnson',
      items: 1,
      total: '49.99',
      status: 'shipped',
      date: 'Today, 11:15 AM',
    },
    {
      id: '3208',
      customer: 'Mike Davis',
      items: 5,
      total: '289.50',
      status: 'delivered',
      date: 'Yesterday',
    },
    {
      id: '3207',
      customer: 'Emily Brown',
      items: 2,
      total: '89.00',
      status: 'pending',
      date: 'Yesterday',
    },
  ];

  const topProducts = [
    {
      name: 'Wireless Earbuds Pro',
      sales: 245,
      revenue: '৳12,250',
      image:
        'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=100&h=100&fit=crop',
    },
    {
      name: 'Smart Watch Series 5',
      sales: 189,
      revenue: '৳37,800',
      image:
        'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=100&h=100&fit=crop',
    },
    {
      name: 'Laptop Stand Aluminum',
      sales: 156,
      revenue: '৳4,680',
      image:
        'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* page header component */}
            <PageHeader title="Dashboard" subtitle="Welcome back, Admin" />
            
      <div className="px-4 py-4 md:px-6 md:py-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {stats.map((stat, index) => (
            <StatsCard key={stat.title} {...stat} delay={index * 50} />
          ))}
        </div>

        {/* Charts Section */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          style={{ animationDelay: '150ms' }}
        >
          <SalesBarChart />
          <CategoryPieChart />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <Link 
            href="/products/new" 
            className="bg-[#4c7fff]/10 rounded-xl p-4 flex items-center gap-3 hover:bg-[#4c7fff]/20 transition-colors active:scale-[0.98]"
          >
            <div className="w-10 h-10 rounded-lg bg-[#4c7fff] flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-sm">Add Product</p>
              <p className="text-xs text-muted-foreground">Quick add</p>
            </div>
          </Link>
          <Link 
            href="/reports" 
            className="bg-[#29a66f]/10 rounded-xl p-4 flex items-center gap-3 hover:bg-[#29a66f]/20 transition-colors active:scale-[0.98]"
          >
            <div className="w-10 h-10 rounded-lg bg-[#29a66f] flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-sm">View Sales</p>
              <p className="text-xs text-muted-foreground">Analytics</p>
            </div>
          </Link>
        </div>

        {/* Recent Orders */}
        <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">Recent Orders</h2>
            <Link
              href="/orders"
              className="text-sm text-primary flex items-center gap-1 hover:underline"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order, index) => (
              <OrderRow key={order.id} order={order} delay={index * 50} />
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">Top Products</h2>
            <Link
              href="/products"
              className="text-sm text-primary flex items-center gap-1 hover:underline"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="bg-card rounded-xl shadow-card overflow-hidden">
            {topProducts.map((product, index) => (
              <div
                key={product.name}
                className={`flex items-center gap-4 p-4 ${
                  index !== topProducts.length - 1
                    ? 'border-b border-border'
                    : ''
                }`}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={48}
                  height={48}
                  className=" rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{product.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {product.sales} sales
                  </p>
                </div>
                <span className="font-semibold text-sm">{product.revenue}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default dashboard;