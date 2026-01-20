'use client'
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation'
import { Save, User, Mail, Phone, MapPin, FileText } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
// import { useToast } from '@/hooks/use-toast';

const customersData = [
  { id: 1, name: 'John Smith', email: 'xyz@email.com', phone: '01712-972683', address: 'Khaliajuri, Netrokona', notes: 'VIP customer, prefers express shipping' },
  { id: 2, name: 'Sarah Johnson', email: 'xyz@email.com', phone: '01712-972683', address: 'Khaliajuri, Netrokona', notes: '' },
  { id: 3, name: 'Mike Davis', email: 'xyz@email.com', phone: '01712-972683', address: 'Khaliajuri, Netrokona', notes: 'Bulk buyer, business account' },
  { id: 4, name: 'Emily Brown', email: 'xyz@email.com', phone: '01712-972683', address: 'Khaliajuri, Netrokona', notes: '' },
  { id: 5, name: 'David Wilson', email: 'xyz@email.com', phone: '01712-972683', address: 'Khaliajuri, Netrokona', notes: 'Prefers email communication' },
];

const CustomerForm = () => {
  const { id } = useParams();
  const router = useRouter();
  // const { toast } = useToast();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    notes: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isEditing) {
      const customer = customersData.find(c => c.id === parseInt(id));
      if (customer) {
        const addressParts = customer.address.split(', ');
        const cityStateZip = addressParts.slice(1).join(', ');
        const cityState = cityStateZip.split(' ');
        
        setFormData({
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          address: addressParts[0] || '',
          city: cityState[0]?.replace(',', '') || '',
          state: cityState[1] || '',
          zipCode: cityState[2] || '',
          notes: customer.notes || '',
        });
      }
    }
  }, [id, isEditing]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // toast({
    //   title: isEditing ? "Customer updated" : "Customer created",
    //   description: `${formData.name} has been ${isEditing ? 'updated' : 'added'} successfully.`,
    // });
    
    setIsSubmitting(false);
    router.push('/customers');
  };

  const inputClasses = (error) => `
    w-full h-11 px-4 rounded-xl bg-background border 
    ${error ? 'border-destructive' : 'border-input'} 
    focus:border-primary focus:ring-2 focus:ring-primary/20 
    outline-none transition-all text-sm
  `;

  return (
    <div className="min-h-screen pb-24 md:pb-6">
      <PageHeader 
        title={isEditing ? "Edit Customer" : "New Customer"}
        showBack
        actions={
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-10 h-10 bg-primary text-primary-foreground rounded-xl flex items-center justify-center hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
          </button>
        }
      />

      <form onSubmit={handleSubmit} className="px-4 py-4 md:px-6 md:py-6 space-y-4">
        {/* Basic Info */}
        <div className="bg-card rounded-xl p-4 shadow-card animate-fade-in">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <User className="w-4 h-4" />
            Basic Information
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter customer name"
                className={inputClasses(errors.name)}
              />
              {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-card rounded-xl p-4 shadow-card animate-fade-in" style={{ animationDelay: '50ms' }}>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Contact Information
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="customer@email.com"
                className={inputClasses(errors.email)}
              />
              {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 234 567 8900"
                className={inputClasses(errors.phone)}
              />
              {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="bg-card rounded-xl p-4 shadow-card animate-fade-in" style={{ animationDelay: '100ms' }}>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Address
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Street Address *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Nagra, Netrokona"
                className={inputClasses(errors.address)}
              />
              {errors.address && <p className="text-destructive text-xs mt-1">{errors.address}</p>}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1.5">City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Netrokona"
                  className={inputClasses(errors.city)}
                />
                {errors.city && <p className="text-destructive text-xs mt-1">{errors.city}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">State *</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="NY"
                  className={inputClasses(errors.state)}
                />
                {errors.state && <p className="text-destructive text-xs mt-1">{errors.state}</p>}
              </div>
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1.5">ZIP Code *</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                placeholder="10001"
                className={inputClasses(errors.zipCode)}
              />
              {errors.zipCode && <p className="text-destructive text-xs mt-1">{errors.zipCode}</p>}
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-card rounded-xl p-4 shadow-card animate-fade-in" style={{ animationDelay: '150ms' }}>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Notes
          </h3>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Add any notes about this customer..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-background border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm resize-none"
          />
        </div>

        {/* Submit Button (Mobile) */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2 md:hidden animate-fade-in"
          style={{ animationDelay: '200ms' }}
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
          ) : (
            <>
              <Save className="w-5 h-5" />
              {isEditing ? 'Update Customer' : 'Create Customer'}
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default CustomerForm;
