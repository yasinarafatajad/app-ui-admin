'use client'
import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import OrderRow from '@/components/ui/OrderRow';
import { useRouter } from 'next/navigation';

const orders = [
  { id: '3210', customer: 'John Smith', items: 3, total: '129.99', status: 'processing', date: 'Today, 2:30 PM' },
  { id: '3209', customer: 'Sarah Johnson', items: 1, total: '49.99', status: 'shipped', date: 'Today, 11:15 AM' },
  { id: '3208', customer: 'Mike Davis', items: 5, total: '289.50', status: 'delivered', date: 'Yesterday' },
  { id: '3207', customer: 'Emily Brown', items: 2, total: '89.00', status: 'pending', date: 'Yesterday' },
  { id: '3206', customer: 'David Wilson', items: 4, total: '199.99', status: 'delivered', date: 'Jan 3, 2024' },
  { id: '3205', customer: 'Lisa Anderson', items: 1, total: '59.99', status: 'cancelled', date: 'Jan 3, 2024' },
  { id: '3204', customer: 'James Taylor', items: 2, total: '149.00', status: 'shipped', date: 'Jan 2, 2024' },
  { id: '3203', customer: 'Jennifer Martinez', items: 3, total: '219.50', status: 'delivered', date: 'Jan 2, 2024' },
  { id: '3202', customer: 'Robert Garcia', items: 1, total: '79.99', status: 'delivered', date: 'Jan 1, 2024' },
  { id: '3201', customer: 'Maria Rodriguez', items: 6, total: '399.00', status: 'delivered', date: 'Jan 1, 2024' },
];

const statusFilters = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

const Orders = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.includes(searchQuery);
    const matchesFilter = activeFilter === 'All' || order.status.toLowerCase() === activeFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen">
      <PageHeader 
        title="Orders" 
        subtitle={`${orders.length} total orders`}
        actions={
          <button
            onClick={() => router.push('/orders/new')}
            className="flex items-center gap-1.5 h-9 px-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New Order</span>
          </button>
        }
      />

      <div className="px-4 py-4 md:px-6 md:py-6 space-y-4">
        {/* Search */}
        <div className="flex gap-3 animate-fade-in">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by order ID or customer..."
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-card border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
            />
          </div>
        </div>

        {/* Status Filters */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 animate-fade-in" style={{ animationDelay: '50ms' }}>
          {statusFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeFilter === filter
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-input text-muted-foreground hover:text-foreground'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-3">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order, index) => (
              <OrderRow key={order.id} order={order} delay={index * 30} />
            ))
          ) : (
            <div className="text-center py-12 animate-fade-in">
              <p className="text-muted-foreground">No orders found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
