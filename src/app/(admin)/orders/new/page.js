'use client'
import { useState } from 'react';
import { Plus, Trash2, Search } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
// import { useToast } from '../hooks/use-toast';

const availableProducts = [
  { id: 1, name: 'Wireless Headphones', shipping: 100, price: 79.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop', stock: 45 },
  { id: 2, name: 'Smart Watch', price: 199.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop', stock: 28 },
  { id: 3, name: 'Laptop Stand', price: 49.99, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop', stock: 62 },
  { id: 4, name: 'USB-C Hub', price: 39.99, image: 'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=100&h=100&fit=crop', stock: 38 },
  { id: 5, name: 'Bluetooth Speaker', price: 59.99, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=100&h=100&fit=crop', stock: 55 },
  { id: 6, name: 'Wireless Mouse', price: 29.99, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop', stock: 80 },
];

const OrderForm = () => {
  const router = useRouter();
  // const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showProductSearch, setShowProductSearch] = useState(false);
  const [productSearch, setProductSearch] = useState('');

  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    shippingAddress: '',
    notes: '',
    items: [],
  });

  const filteredProducts = availableProducts.filter(p =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) &&
    !formData.items.find(item => item.id === p.id)
  );

  const addProduct = (product) => {
    setFormData({
      ...formData,
      items: [...formData.items, { ...product, quantity: 1 }]
    });
    setShowProductSearch(false);
    setProductSearch('');
  };

  const removeProduct = (productId) => {
    setFormData({
      ...formData,
      items: formData.items.filter(item => item.id !== productId)
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    setFormData({
      ...formData,
      items: formData.items.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    });
  };

  const subtotal = formData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 1000 ? 0 : 100;
  const total = subtotal + shipping;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.customerName || !formData.customerEmail || !formData.shippingAddress) {
      // toast({
      //   title: 'Missing Information',
      //   description: 'Please fill in all required fields',
      //   variant: 'destructive',
      // });
      return;
    }

    if (formData.items.length === 0) {
      // toast({
      //   title: 'No Items',
      //   description: 'Please add at least one product to the order',
      //   variant: 'destructive',
      // });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // toast({
    //   title: 'Order Created',
    //   description: 'New order has been created successfully',
    // });

    router.push('/orders');
  };

  return (
    <div className="min-h-screen pb-24 md:pb-6">
      <PageHeader
        title="New Order"
        subtitle="Create a new order"
        showBack
      />

      <form onSubmit={handleSubmit} className="px-4 py-4 md:px-6 md:py-6 space-y-4">
        {/* Customer Information */}
        <div className="bg-card rounded-xl p-4 shadow-card animate-fade-in">
          <h3 className="font-semibold mb-4">Customer Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Customer Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                placeholder="Enter customer name"
                className="w-full h-11 px-4 rounded-xl bg-background border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Email <span className="text-destructive">*</span>
                </label>
                <input
                  type="email"
                  value={formData.customerEmail}
                  onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                  placeholder="xyz@gmail.com"
                  className="w-full h-11 px-4 rounded-xl bg-background border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Phone</label>
                <input
                  type="tel"
                  value={formData.customerPhone}
                  onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                  placeholder="+8801*******83"
                  className="w-full h-11 px-4 rounded-xl bg-background border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Shipping Address <span className="text-destructive">*</span>
              </label>
              <textarea
                value={formData.shippingAddress}
                onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
                placeholder="Enter full shipping address"
                rows={2}
                className="w-full px-4 py-3 rounded-xl bg-background border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm resize-none"
              />
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-card rounded-xl p-4 shadow-card animate-fade-in" style={{ animationDelay: '50ms' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Order Items</h3>
            <button
              type="button"
              onClick={() => setShowProductSearch(true)}
              className="flex items-center gap-1.5 text-sm text-primary font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </button>
          </div>

          {/* Product Search Modal */}
          {showProductSearch && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center animate-fade-in">
              <div className="bg-card w-full md:max-w-md md:rounded-xl rounded-t-xl max-h-[80vh] overflow-hidden animate-slide-up">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">Add Product</h3>
                    <button
                      type="button"
                      onClick={() => {
                        setShowProductSearch(false);
                        setProductSearch('');
                      }}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      placeholder="Search products..."
                      className="w-full h-10 pl-9 pr-4 rounded-lg bg-background border border-input focus:border-primary outline-none text-sm"
                      autoFocus
                    />
                  </div>
                </div>
                <div className="overflow-y-auto max-h-[60vh] p-2">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => addProduct(product)}
                        className="w-full flex items-center gap-3 p-3 hover:bg-muted rounded-lg transition-colors text-left"
                      >
                        <Image
                          height={48}
                          width={48}
                          src={product.image}
                          alt={product.name}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.stock} in stock</p>
                        </div>
                        <span className="font-semibold">৳{product.price}</span>
                      </button>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground py-8">No products found</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Selected Items */}
          {formData.items.length > 0 ? (
            <div className="space-y-3">
              {formData.items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">৳{item.price} each</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-full bg-background border border-input flex items-center justify-center text-sm hover:bg-muted"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-full bg-background border border-input flex items-center justify-center text-sm hover:bg-muted"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeProduct(item.id)}
                    className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No items added yet</p>
              <p className="text-xs mt-1">Click "Add Product" to add items to this order</p>
            </div>
          )}
        </div>

        {/* Order Notes */}
        <div className="bg-card rounded-xl p-4 shadow-card animate-fade-in" style={{ animationDelay: '100ms' }}>
          <h3 className="font-semibold mb-4">Order Notes</h3>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Add any special instructions or notes..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-background border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm resize-none"
          />
        </div>

        {/* Order Summary */}
        {formData.items.length > 0 && (
          <div className="bg-card rounded-xl p-4 shadow-card animate-fade-in" style={{ animationDelay: '150ms' }}>
            <h3 className="font-semibold mb-3">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal ({formData.items.reduce((sum, i) => sum + i.quantity, 0)} items)</span>
                <span>৳{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping === 0 ? 'Free' : `৳${shipping.toFixed(2)}`}</span>
              </div>
              <p className="text-xs text-success">Free shipping on orders over ৳1000</p>
              <div className="flex justify-between font-semibold text-base pt-2 border-t border-border">
                <span>Total</span>
                <span>৳{(shipping + subtotal).toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 animate-fade-in"
          style={{ animationDelay: '200ms' }}
        >
          {isSubmitting ? 'Creating Order...' : 'Create Order'}
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
