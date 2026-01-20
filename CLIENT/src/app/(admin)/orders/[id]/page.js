'use client'
import { useState } from 'react'
import { Package, Truck, CheckCircle, Clock, XCircle, MapPin, Phone, Mail, ArrowLeft } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import { useParams, useRouter } from 'next/navigation';
// import { useToast } from '../hooks/use-toast';

const ordersData = {
  '3210': {
    id: '3210',
    customer: 'John Smith',
    email: 'xyz@email.com',
    phone: '01712-972683',
    address: 'Netrokona,Mymensingh',
    items: [
      { id: 1, name: 'Wireless Headphones', quantity: 1, price: 79.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop' },
      { id: 2, name: 'Phone Case', quantity: 2, price: 25.00, image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=100&h=100&fit=crop' },
    ],
    subtotal: 129.99,
    shipping: 0,
    total: 129.99,
    status: 'processing',
    date: 'Jan 5, 2024, 2:30 PM',
    paymentMethod: 'Credit Card (**** 4242)',
    notes: 'Please leave at door'
  },
  '3209': {
    id: '3209',
    customer: 'Sarah Johnson',
    email: 'xyz@email.com',
    phone: '01712-972683',
    address: 'Netrokona,Mymensingh',
    items: [
      { id: 1, name: 'Smart Watch', quantity: 1, price: 49.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop' },
    ],
    subtotal: 49.99,
    shipping: 0,
    total: 49.99,
    status: 'shipped',
    date: 'Jan 5, 2024, 11:15 AM',
    paymentMethod: 'PayPal',
    trackingNumber: '1Z999AA10123456784',
    notes: ''
  },
  '3208': {
    id: '3208',
    customer: 'Mike Davis',
    email: 'xyz@email.com',
    phone: '01712-972683',
    address: 'Netrokona,Mymensingh',
    items: [
      { id: 1, name: 'Laptop Stand', quantity: 1, price: 89.99, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop' },
      { id: 2, name: 'USB-C Hub', quantity: 2, price: 45.00, image: 'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=100&h=100&fit=crop' },
      { id: 3, name: 'Wireless Mouse', quantity: 1, price: 29.99, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop' },
      { id: 4, name: 'Keyboard', quantity: 1, price: 79.52, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=100&h=100&fit=crop' },
    ],
    subtotal: 289.50,
    shipping: 0,
    total: 289.50,
    status: 'delivered',
    date: 'Jan 4, 2024',
    paymentMethod: 'Credit Card (**** 1234)',
    trackingNumber: '1Z999AA10123456785',
    deliveredDate: 'Jan 5, 2024, 10:30 AM',
    notes: 'Gift wrap requested'
  },
  '3207': {
    id: '3207',
    customer: 'Emily Brown',
    email: 'xyz@email.com',
    phone: '01712-972683',
    address: 'Netrokona,Mymensingh',
    items: [
      { id: 1, name: 'Bluetooth Speaker', quantity: 1, price: 59.00, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=100&h=100&fit=crop' },
      { id: 2, name: 'Charging Cable', quantity: 2, price: 15.00, image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=100&h=100&fit=crop' },
    ],
    subtotal: 89.00,
    shipping: 180,
    total: 89.00,
    status: 'pending',
    date: 'Jan 4, 2024',
    paymentMethod: 'Credit Card (**** 5678)',
    notes: ''
  },
};

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-warning/10 text-warning border-warning/20', icon: Clock },
  processing: { label: 'Processing', color: 'bg-primary/10 text-primary border-primary/20', icon: Package },
  shipped: { label: 'Shipped', color: 'bg-accent/10 text-accent border-accent/20', icon: Truck },
  delivered: { label: 'Delivered', color: 'bg-success/10 text-success border-success/20', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: 'bg-destructive/10 text-destructive border-destructive/20', icon: XCircle },
};

const statusFlow = ['pending', 'processing', 'shipped', 'delivered'];

const OrderDetail = () => {
  const { id } = useParams();
  const router = useRouter()
  // const { toast } = useToast();
  const [order, setOrder] = useState(ordersData[id] || null);
  const [isUpdating, setIsUpdating] = useState(false);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Order not found</p>
          <button
            onClick={() => router.push('/orders')}
            className="text-primary hover:underline"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  const StatusIcon = statusConfig[order.status].icon;
  const currentStatusIndex = statusFlow.indexOf(order.status);

  const updateStatus = async (newStatus) => {
    setIsUpdating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    setOrder({ ...order, status: newStatus });
    setIsUpdating(false);
    // toast({
    //   title: 'Status Updated',
    //   description: `Order #${order.id} is now ${statusConfig[newStatus].label}`,
    // });
  };

  const cancelOrder = async () => {
    setIsUpdating(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setOrder({ ...order, status: 'cancelled' });
    setIsUpdating(false);
    // toast({
    //   title: 'Order Cancelled',
    //   description: `Order #${order.id} has been cancelled`,
    //   variant: 'destructive',
    // });
  };

  return (
    <div className="min-h-screen pb-24 md:pb-6">
      <PageHeader
        title={`Order #${order.id}`}
        subtitle={order.date}
        showBack
      />

      <div className="px-4 py-4 md:px-6 md:py-6 space-y-4">
        {/* Status Card */}
        <div className="bg-card rounded-xl p-4 shadow-card animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${statusConfig[order.status].color}`}>
                <StatusIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold">{statusConfig[order.status].label}</p>
                <p className="text-xs text-muted-foreground">Current Status</p>
              </div>
            </div>
            <span className={`text-xs font-medium px-3 py-1 rounded-full border ${statusConfig[order.status].color}`}>
              {statusConfig[order.status].label}
            </span>
          </div>

          {/* Status Progress */}
          {order.status !== 'cancelled' && (
            <div className="flex items-center gap-1 mb-4">
              {statusFlow.map((status, index) => (
                <div key={status} className="flex-1 flex items-center">
                  <div
                    className={`h-1.5 flex-1 rounded-full transition-colors ${index <= currentStatusIndex ? 'bg-primary' : 'bg-muted'
                      }`}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          {order.status !== 'cancelled' && order.status !== 'delivered' && (
            <div className="flex gap-2 flex-wrap">
              {currentStatusIndex < statusFlow.length - 1 && (
                <button
                  onClick={() => updateStatus(statusFlow[currentStatusIndex + 1])}
                  disabled={isUpdating}
                  className="flex-1 h-10 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {isUpdating ? 'Updating...' : `Mark as ${statusConfig[statusFlow[currentStatusIndex + 1]].label}`}
                </button>
              )}
              <button
                onClick={cancelOrder}
                disabled={isUpdating}
                className="h-10 px-4 bg-destructive/10 text-destructive rounded-lg text-sm font-medium hover:bg-destructive/20 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Order Items */}
        <div className="bg-card rounded-xl p-4 shadow-card animate-fade-in" style={{ animationDelay: '50ms' }}>
          <h3 className="font-semibold mb-3">Items ({order.items.length})</h3>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-lg object-cover bg-muted"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold text-sm">৳{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-border mt-4 pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>৳{order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span>{order.shipping === 0 ? 'Free' : `৳${order.shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>
                ৳{((order?.shipping || 0) + (order?.subtotal || 0)).toFixed(2)}
              </span>

            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div className="bg-card rounded-xl p-4 shadow-card animate-fade-in" style={{ animationDelay: '100ms' }}>
          <h3 className="font-semibold mb-3">Customer</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-semibold">{order.customer.charAt(0)}</span>
              </div>
              <div>
                <p className="font-medium">{order.customer}</p>
                <p className="text-xs text-muted-foreground">Customer</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span>{order.email}</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span>{order.phone}</span>
            </div>

            <div className="flex items-start gap-3 text-sm">
              <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
              <span>{order.address}</span>
            </div>
          </div>
        </div>

        {/* Payment & Shipping Info */}
        <div className="bg-card rounded-xl p-4 shadow-card animate-fade-in" style={{ animationDelay: '150ms' }}>
          <h3 className="font-semibold mb-3">Payment & Shipping</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment Method</span>
              <span>{order.paymentMethod}</span>
            </div>
            {order.trackingNumber && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tracking Number</span>
                <span className="text-primary">{order.trackingNumber}</span>
              </div>
            )}
            {order.deliveredDate && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivered On</span>
                <span>{order.deliveredDate}</span>
              </div>
            )}
            {order.notes && (
              <div className="pt-2 border-t border-border mt-2">
                <span className="text-muted-foreground">Notes:</span>
                <p className="mt-1">{order.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
