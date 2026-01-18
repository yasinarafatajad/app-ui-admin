'use client';
import { useState, useEffect } from 'react';
import { ArrowLeft, Upload, X, Save, Loader2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import PageHeader from '@/components/layout/PageHeader';
import Image from 'next/image';
// import { useToast } from '../hooks/use-toast';

const categories = ['Electronics', 'Accessories', 'Storage', 'Audio', 'Wearables'];

const mockProducts = [
  { id: '1', name: 'Wireless Earbuds Pro', category: 'Electronics', price: '49.99', stock: '245', description: 'High-quality wireless earbuds with noise cancellation.', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop' },
  { id: '2', name: 'Smart Watch Series 5', category: 'Electronics', price: '199.99', stock: '89', description: 'Advanced smartwatch with health monitoring features.', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop' },
  { id: '3', name: 'Laptop Stand Aluminum', category: 'Accessories', price: '29.99', stock: '156', description: 'Ergonomic aluminum laptop stand for better posture.', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop' },
  { id: '4', name: 'Mechanical Keyboard', category: 'Electronics', price: '89.99', stock: '4', description: 'RGB mechanical keyboard with tactile switches.', image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400&h=400&fit=crop' },
];

const ProductForm = () => {
  const router = useRouter();
  // const { toast } = useToast();
  const params = useParams();
  const productId = params?.id;
  const isEditing = Boolean(productId);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    image: '',
  });

useEffect(() => {
  if (!isEditing) return;

  const product = mockProducts.find(p => p.id === productId);
  if (product) {
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      description: product.description,
      image: product.image,
    });
  }
}, [isEditing, productId]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: '' }));
  };

  const handleFileUpload = (e)=> {
  const file = e.target.files?.[0];
  if (!file) return;

  const previewUrl = URL.createObjectURL(file);

  setFormData(prev => ({
    ...prev,
    image: previewUrl,
    imageFile: file, // keep for backend upload
  }));

};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // toast({
    //   title: isEditing ? 'Product updated' : 'Product created',
    //   description: `${formData.name} has been ${isEditing ? 'updated' : 'added'} successfully.`,
    // });

    setLoading(false);
    router.push('/products');
  };

  
  return (
    <div className="min-h-screen pb-24">
      <PageHeader
        title={isEditing ? 'Edit Product' : 'Add Product'}
        subtitle={isEditing ? `Editing ${formData.name}` : 'Create a new product'}
        showBack
      />

      <form onSubmit={handleSubmit} className="px-4 py-4 md:px-6 md:py-6 space-y-6 max-w-2xl mx-auto">
        {/* Image Upload */}
        <div className="animate-fade-in">
          <label className="block text-sm font-medium mb-2">Product Image</label>
          {formData.image ? (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-secondary">
              <Image
              fill
                src={formData.image}
                alt="Product preview"
                className="object-cover"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 w-8 h-8 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Upload Area */}
              <div
                onClick={() => document.getElementById('imgUpload')?.click()}
                className="cursor-pointer w-full aspect-video rounded-xl border-2 border-dashed border-border bg-secondary/50 flex flex-col items-center justify-center gap-2 hover:border-primary transition"
              >
                <Upload className="w-8 h-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Click to upload or paste image URL
                </p>
              </div>

              {/* Hidden File Input */}
              <input
                id="imgUpload"
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileUpload}
              />
            </div>
          )}
        </div>

        {/* Product Name */}
        <div className="animate-fade-in" style={{ animationDelay: '50ms' }}>
          <label className="block text-sm font-medium mb-2">Product Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter product name"
            className="w-full h-11 px-4 rounded-xl bg-card border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
          />
        </div>

        {/* Category */}
        <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
          <label className="block text-sm font-medium mb-2">Category *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full h-11 px-4 rounded-xl bg-card border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm appearance-none cursor-pointer"
          >
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Price and Stock */}
        <div className="grid grid-cols-2 gap-4 animate-fade-in" style={{ animationDelay: '150ms' }}>
          <div>
            <label className="block text-sm font-medium mb-2">Price *</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">৳</span>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                step="0.01"
                min="0"
                placeholder="0.00"
                className="w-full h-11 pl-8 pr-4 rounded-xl bg-card border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Stock *</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              min="0"
              placeholder="0"
              className="w-full h-11 px-4 rounded-xl bg-card border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
            />
          </div>
        </div>

        {/* Description */}
        <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Enter product description..."
            className="w-full px-4 py-3 rounded-xl bg-card border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm resize-none"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end px-4 md:static md:px-0 animate-fade-in" style={{ animationDelay: '250ms' }}>
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-primary text-primary-foreground rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed md:max-w-xs"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                {isEditing ? 'Update Product' : 'Create Product'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
