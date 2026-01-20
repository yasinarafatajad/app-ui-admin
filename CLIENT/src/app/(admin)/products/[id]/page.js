'use client';
import { ArrowLeft, Edit, Trash2, Package, Tag, DollarSign, Box } from 'lucide-react';
import { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
// import { useToast } from '../hooks/use-toast';

import { useParams, useRouter } from "next/navigation";
import Image from 'next/image';

const mockProducts = [
  { id: 1, name: 'Wireless Earbuds', category: 'Electronics', price: 79.99, stock: 45, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400', description: 'High-quality wireless earbuds with noise cancellation and 24-hour battery life.' },
  { id: 2, name: 'Leather Wallet', category: 'Accessories', price: 49.99, stock: 120, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400', description: 'Premium leather wallet with RFID protection and multiple card slots.' },
  { id: 3, name: 'Smart Watch', category: 'Electronics', price: 199.99, stock: 3, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', description: 'Feature-rich smartwatch with health monitoring and GPS tracking.' },
  { id: 4, name: 'Running Shoes', category: 'Footwear', price: 129.99, stock: 67, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', description: 'Lightweight running shoes with responsive cushioning for maximum comfort.' },
  { id: 5, name: 'Backpack', category: 'Accessories', price: 89.99, stock: 34, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', description: 'Durable backpack with laptop compartment and water-resistant material.' },
  { id: 6, name: 'Sunglasses', category: 'Accessories', price: 159.99, stock: 5, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400', description: 'Stylish sunglasses with UV400 protection and polarized lenses.' },
];

const ProductDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  //   const { toast } = useToast();
  const [deleting, setDeleting] = useState(false);

  const product = mockProducts.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="p-6">
        <PageHeader title="Product Not Found" />
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">The product you're looking for doesn't exist.</p>
          <Button onClick={() => router.push('/products')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  const handleDelete = async () => {
    setDeleting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // toast({
    //   title: "Product deleted",
    //   description: `${product.name} has been deleted successfully.`,
    // });
    router.push('/products');
  };

  return (
    <div className='min-h-screen'>
    <PageHeader
        title="Product Details"
        showBack
      />
    <div className="p-6 py-4 mx-auto">
      <div className="bg-card rounded-xl shadow-card overflow-hidden animate-fade-in">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="aspect-square bg-secondary relative">
            <Image
              fill
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6 flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                  <Tag className="w-3 h-3" />
                  {product.category}
                </span>
              </div>
              {product.stock <= 5 && (
                <span className="px-3 py-1 bg-warning text-warning-foreground text-xs font-medium rounded-full">
                  Low stock
                </span>
              )}
            </div>

            <p className="text-muted-foreground mb-6 flex-grow">
              {product.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-secondary/50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <DollarSign className="w-4 h-4" />
                  Price
                </div>
                <p className="text-2xl font-bold">৳{product.price}</p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <Box className="w-4 h-4" />
                  Stock
                </div>
                <p className="text-2xl font-bold">{product.stock} units</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                className="flex-1"
                onClick={() => router.push(`/products/${product.id}/edit`)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Product
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Product</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{product.name}"? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      disabled={deleting}
                    >
                      {deleting ? 'Deleting...' : 'Delete'}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProductDetail;
