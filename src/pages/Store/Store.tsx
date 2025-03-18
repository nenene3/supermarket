import {ProductCard} from "@/components/Card";
import { Grid }  from "@/components/Grid";
import React from "react";
import useGetProducts from "@/features/Store/useGetProducts";
import { ProductType } from "@/features/Products/productForm";
type Props = {};

const Store = (props: Props) => {

  const {products ,error,isLoading} = useGetProducts()
  

  const products2 = [
    {
      id: "1",
      title: "Wireless Noise-Cancelling Headphones",
      description:
        "Premium wireless headphones with active noise cancellation, 30-hour battery life, and comfortable over-ear design.",
      price: 299.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Electronics",
      rating: 4.8,
      discount: 15,
      inStock: true,
    },
    {
      id: "2",
      title: "Organic Cotton T-Shirt",
      description: "Soft, breathable organic cotton t-shirt with a relaxed fit and sustainable production methods.",
      price: 29.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Clothing",
      rating: 4.5,
      inStock: true,
    },
    {
      id: "3",
      title: "Smart Home Security Camera",
      description: "HD security camera with motion detection, night vision, two-way audio, and smartphone notifications.",
      price: 129.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Smart Home",
      rating: 4.3,
      discount: 10,
      inStock: true,
    },
    {
      id: "4",
      title: "Stainless Steel Water Bottle",
      description: "Double-walled insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours.",
      price: 34.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Kitchen",
      rating: 4.7,
      inStock: true,
    },
    {
      id: "5",
      title: "Ergonomic Office Chair",
      description: "Adjustable office chair with lumbar support, breathable mesh back, and comfortable cushioned seat.",
      price: 249.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Furniture",
      rating: 4.6,
      discount: 20,
      inStock: false,
    },
    {
      id: "6",
      title: "Ceramic Plant Pot Set",
      description: "Set of 3 minimalist ceramic plant pots in varying sizes, perfect for indoor plants and succulents.",
      price: 49.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Home Decor",
      rating: 4.4,
      inStock: true,
    },
    {
      id: "7",
      title: "Bluetooth Portable Speaker",
      description:
        "Waterproof portable speaker with 360° sound, 16-hour battery life, and built-in microphone for calls.",
      price: 89.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Electronics",
      rating: 4.2,
      discount: 5,
      inStock: true,
    },
    {
      id: "8",
      title: "Leather Crossbody Bag",
      description:
        "Genuine leather crossbody bag with adjustable strap, multiple compartments, and secure zipper closure.",
      price: 119.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Accessories",
      rating: 4.9,
      inStock: true,
    },
  ]

  if(isLoading){
    return <h1>loading</h1>
  }else{
    console.log(products)
  }

  if(error){
    return <h1>error</h1>
  }

  return (
    <main className="container mx-auto py-8">
      <h1 className="mb-6 text-2xl font-bold">Featured Products</h1>

      {/* Using your original Grid component with explicit gap control */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {products!.map((product) => (
          <ProductCard key={product.id} {...product} />
          
        ))}
        
      </div>

    </main>
  );
};

export default Store;
