'use client'
import { useState } from 'react';
import { Mail, Phone, MapPin, Calendar, ShoppingBag, DollarSign, Edit2, Trash2, ArrowLeft } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import { useParams, useRouter } from 'next/navigation';
// import { useToast } from '@/hooks/use-toast';

const customersData = [
  { id: 1, name: 'John Smith', email: 'xyz@gmail.com', phone: '017******83', address: 'Netrokona, Mymensingh', orders: 12, spent: '1,245.00', joined: 'Dec 2023', notes: 'VIP customer, prefers express shipping' },
  { id: 2, name: 'Sarah Johnson', email: 'xyz@gmail.com', phone: '017******83', address: 'Netrokona, Mymensingh', orders: 8, spent: '890.50', joined: 'Nov 2023', notes: '' },
  { id: 3, name: 'Mike Davis', email: 'xyz@gmail.com', phone: '017******83', address: 'Netrokona, Mymensingh', orders: 24, spent: '3,456.00', joined: 'Oct 2023', notes: 'Bulk buyer, business account' },
  { id: 4, name: 'Emily Brown', email: 'xyz@gmail.com', phone: '017******83', address: 'Netrokona, Mymensingh', orders: 5, spent: '425.00', joined: 'Jan 2024', notes: '' },
  { id: 5, name: 'David Wilson', email: 'xyz@gmail.com', phone: '017******83', address: 'Netrokona, Mymensingh', orders: 15, spent: '2,100.00', joined: 'Sep 2023', notes: 'Prefers email communication' },
  { id: 6, name: 'Lisa Anderson', email: 'xyz@gmail.com', phone: '017******83', address: 'Netrokona, Mymensingh', orders: 3, spent: '189.99', joined: 'Jan 2024', notes: '' },
  { id: 7, name: 'James Taylor', email: 'xyz@gmail.com', phone: '017******83', address: 'Netrokona, Mymensingh', orders: 9, spent: '756.00', joined: 'Nov 2023', notes: '' },
  { id: 8, name: 'Jennifer Martinez', email: 'xyz@gmail.com', phone: '017******83', address: 'Netrokona, Mymensingh', orders: 18, spent: '2,890.00', joined: 'Aug 2023', notes: 'Loyal customer, always leaves reviews' },
  { id: 9, name: 'Robert Garcia', email: 'xyz@gmail.com', phone: '017******83', address: 'Netrokona, Mymensingh', orders: 6, spent: '520.00', joined: 'Dec 2023', notes: '' },
  { id: 10, name: 'Maria Rodriguez', email: 'xyz@gmail.com', phone: '017******83', address: 'Netrokona, Mymensingh', orders: 21, spent: '4,200.00', joined: 'Jul 2023', notes: 'Top customer, eligible for premium benefits' },
];

const recentOrders = [
  { id: 'ORD-001', date: 'Jan 15, 2024', items: 3, total: '৳125.00', status: 'Delivered' },
  { id: 'ORD-002', date: 'Jan 10, 2024', items: 1, total: '৳49.99', status: 'Delivered' },
  { id: 'ORD-003', date: 'Dec 28, 2023', items: 5, total: '৳299.00', status: 'Delivered' },
];

const CustomerDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  // const { toast } = useToast();
  
  const customer = customersData.find(c => c.id === parseInt(id));
  
  if (!customer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <p className="text-muted-foreground mb-4">Customer not found</p>
          <button 
            onClick={() => router.push('/customers')}
            className="text-primary hover:underline"
          >
            Back to Customers
          </button>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    // toast({
    //   title: "Customer deleted",
    //   description: `${customer.name} has been removed.`,
    // });
    router.push('/customers');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-700';
      case 'Processing': return 'bg-blue-100 text-blue-700';
      case 'Shipped': return 'bg-purple-100 text-purple-700';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen pb-24 md:pb-6">
      <PageHeader 
        title="Customer Details"
        showBack
        actions={
          <div className="flex gap-2">
            <button 
              onClick={() => router.push(`/customers/edit/${customer.id}`)}
              className="w-10 h-10 bg-primary text-primary-foreground rounded-xl flex items-center justify-center hover:opacity-90 active:scale-95 transition-all"
            >
              <Edit2 className="w-5 h-5" />
            </button>
            <button 
              onClick={handleDelete}
              className="w-10 h-10 bg-destructive text-destructive-foreground rounded-xl flex items-center justify-center hover:opacity-90 active:scale-95 transition-all"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        }
      />

      <div className="px-4 py-4 md:px-6 md:py-6 space-y-4">
        {/* Customer Header */}
        <div className="bg-card rounded-xl p-5 shadow-card animate-fade-in">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary text-2xl font-bold">
                {customer.name.charAt(0)}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-semibold">{customer.name}</h2>
              <p className="text-sm text-muted-foreground">Customer since {customer.joined}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 animate-fade-in" style={{ animationDelay: '50ms' }}>
          <div className="bg-card rounded-xl p-4 shadow-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{customer.orders}</p>
                <p className="text-xs text-muted-foreground">Total Orders</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">৳{customer.spent}</p>
                <p className="text-xs text-muted-foreground">Total Spent</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-card rounded-xl p-4 shadow-card animate-fade-in" style={{ animationDelay: '100ms' }}>
          <h3 className="font-semibold mb-3">Contact Information</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{customer.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{customer.phone}</span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
              <span className="text-sm">{customer.address}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">Joined {customer.joined}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {customer.notes && (
          <div className="bg-card rounded-xl p-4 shadow-card animate-fade-in" style={{ animationDelay: '150ms' }}>
            <h3 className="font-semibold mb-2">Notes</h3>
            <p className="text-sm text-muted-foreground">{customer.notes}</p>
          </div>
        )}

        {/* Recent Orders */}
        <div className="bg-card rounded-xl p-4 shadow-card animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Recent Orders</h3>
            <button 
              onClick={() => router.push('/orders')}
              className="text-xs text-primary hover:underline"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div 
                key={order.id}
                onClick={() => router.push(`/orders/${order.id.replace('ORD-', '')}`)}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted transition-colors"
              >
                <div>
                  <p className="font-medium text-sm">{order.id}</p>
                  <p className="text-xs text-muted-foreground">{order.date} • {order.items} items</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm">{order.total}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;
