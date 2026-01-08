
import React from 'react';
import { Plus } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">
          {product.category}
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
          <span className="text-orange-600 font-bold text-lg">${product.price}</span>
        </div>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 h-10">
          {product.description}
        </p>
        <button 
          onClick={() => onAddToCart(product)}
          className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl flex items-center justify-center gap-2 transition-colors font-medium shadow-sm active:scale-95"
        >
          <Plus size={18} />
          加入購物車
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
