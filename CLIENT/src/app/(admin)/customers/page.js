'use client'
import { useState } from 'react';
import { Search, UserPlus } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import CustomerRow from '@/components/ui/CustomerRow';
import { useRouter } from 'next/navigation';

const customers = [
  { id: 1, name: 'John Smith', email: 'john.smith@email.com', orders: 12, spent: '1,245.00', joined: 'Dec 2023' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah.j@email.com', orders: 8, spent: '890.50', joined: 'Nov 2023' },
  { id: 3, name: 'Mike Davis', email: 'mike.davis@email.com', orders: 24, spent: '3,456.00', joined: 'Oct 2023' },
  { id: 4, name: 'Emily Brown', email: 'emily.brown@email.com', orders: 5, spent: '425.00', joined: 'Jan 2024' },
  { id: 5, name: 'David Wilson', email: 'david.w@email.com', orders: 15, spent: '2,100.00', joined: 'Sep 2023' },
  { id: 6, name: 'Lisa Anderson', email: 'lisa.a@email.com', orders: 3, spent: '189.99', joined: 'Jan 2024' },
  { id: 7, name: 'James Taylor', email: 'james.t@email.com', orders: 9, spent: '756.00', joined: 'Nov 2023' },
  { id: 8, name: 'Jennifer Martinez', email: 'jen.m@email.com', orders: 18, spent: '2,890.00', joined: 'Aug 2023' },
  { id: 9, name: 'Robert Garcia', email: 'robert.g@email.com', orders: 6, spent: '520.00', joined: 'Dec 2023' },
  { id: 10, name: 'Maria Rodriguez', email: 'maria.r@email.com', orders: 21, spent: '4,200.00', joined: 'Jul 2023' },
];

const Customers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalCustomers = customers.length;
  const totalSpent = customers.reduce((acc, c) => acc + parseFloat(c.spent.replace(',', '')), 0);
  const avgOrderValue = (totalSpent / customers.reduce((acc, c) => acc + c.orders, 0)).toFixed(2);

  return (
    <div className="min-h-screen">
      <PageHeader 
        title="Customers" 
        subtitle={`${customers.length} customers`}
        actions={
          <button 
            onClick={() => router.push('/customers/new')}
            className="w-10 h-10 bg-primary text-primary-foreground rounded-xl flex items-center justify-center hover:opacity-90 active:scale-95 transition-all"
          >
            <UserPlus className="w-5 h-5" />
          </button>
        }
      />

      <div className="px-4 py-4 md:px-6 md:py-6 space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 animate-fade-in">
          <div className="bg-card rounded-xl p-3 shadow-card text-center">
            <p className="text-lg font-bold">{totalCustomers}</p>
            <p className="text-xs text-muted-foreground">Customers</p>
          </div>
          <div className="bg-card rounded-xl p-3 shadow-card text-center">
            <p className="text-lg font-bold">৳{(totalSpent / 1000).toFixed(1)}k</p>
            <p className="text-xs text-muted-foreground">Total Spent</p>
          </div>
          <div className="bg-card rounded-xl p-3 shadow-card text-center">
            <p className="text-lg font-bold">৳{avgOrderValue}</p>
            <p className="text-xs text-muted-foreground">Avg Order</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative animate-fade-in" style={{ animationDelay: '50ms' }}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search customers..."
            className="w-full h-11 pl-10 pr-4 rounded-xl bg-card border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
          />
        </div>

        {/* Customers List */}
        <div className="space-y-3">
          {filteredCustomers.length > 0 ? (
            filteredCustomers.map((customer, index) => (
              <CustomerRow key={customer.id} customer={customer} delay={index * 30} />
            ))
          ) : (
            <div className="text-center py-12 animate-fade-in">
              <p className="text-muted-foreground">No customers found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Customers;
