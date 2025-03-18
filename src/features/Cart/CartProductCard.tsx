import React from 'react';
import { useAppDispatch } from '@/hooks';
import { ProductType } from '@/features/Products/productForm'
import { reset,removeProduct } from './CartSlice';
type Props = {
  product: ProductType;
  index: number;
  count?: number;
};

const CartProductCard = ({ product, index, count = 1 }: Props) => {
  const dispatch = useAppDispatch();

  const handleRemove = () => {
    dispatch(removeProduct(index));
  };

  return (
    <div className="flex items-center justify-between p-4 mb-2 bg-white rounded-lg shadow">
      <div className="flex items-center space-x-4">
        {product.image && (
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-16 h-16 object-cover rounded"
          />
        )}
        <div>
          <h3 className="font-bold text-lg">{product.title}</h3>
          <p className="text-gray-600">${product.price?.toFixed(2)}</p>
          {count > 1 && (
            <div className="text-sm font-medium text-blue-600">
              Quantity: {count}
            </div>
          )}
        </div>
      </div>
      <button 
        onClick={handleRemove}
        className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600 transition"
      >
        Remove
      </button>
    </div>
  );
};

export default CartProductCard;