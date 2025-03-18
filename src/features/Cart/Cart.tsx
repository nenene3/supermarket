import React from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks';
import CartProductCard from './CartProductCard';
import { ProductType } from '@/features/Products/productForm'

type Props = {};

const Cart = (props: Props) => {
  const products = useAppSelector(e => e.cart.products);
  const dispatch = useAppDispatch();

  // Group products and count occurrences
  const groupedProducts = products.reduce((acc, product, index) => {
    // Create a unique key based on product properties (adjust as needed)
    const key = `${product.id}-${product.title}-${product.price}`;
    
    if (!acc[key]) {
      acc[key] = {
        product,
        count: 1,
        indices: [index]
      };
    } else {
      acc[key].count += 1;
      acc[key].indices.push(index);
    }
    
    return acc;
  }, {} as Record<string, { product: ProductType; count: number; indices: number[] }>);

  return (
    <div className=" p-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      
      {Object.keys(groupedProducts).length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        Object.values(groupedProducts).map((group) => (
          <CartProductCard 
            key={`${group.product.id}-${group.indices[0]}`}
            product={group.product}
            index={group.indices[0]} // Pass the first index for removal
            count={group.count}
          />
        ))
      )}
      
      {products.length > 0 && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow">
          <div className="flex justify-between">
            <span className="font-bold">Total Items:</span>
            <span>{products.length}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="font-bold">Total Price:</span>
            <span>
              ${products.reduce((sum, product) => sum + (product.price || 0), 0).toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;