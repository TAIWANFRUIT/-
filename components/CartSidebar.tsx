
import React from 'react';
import { Trash2, Plus, Minus, X, ShoppingCart } from 'lucide-react';
import { CartItem } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemoveItem: (id: number) => void;
  onCheckout: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem,
  onCheckout
}) => {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className={`fixed inset-0 z-50 transition-all duration-300 ${isOpen ? 'visible' : 'invisible'}`}>
      <div 
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} 
        onClick={onClose}
      />
      <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-500 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
        <div className="p-6 border-b flex justify-between items-center bg-orange-600 text-white">
          <div className="flex items-center gap-3">
            <ShoppingCart size={24} />
            <h2 className="text-xl font-bold">我的購物車</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-orange-500 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-4">
              <ShoppingCart size={64} strokeWidth={1} />
              <p className="text-lg">購物車是空的，快去點餐吧！</p>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 border-b pb-6 last:border-0">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-gray-800">{item.name}</h4>
                      <button onClick={() => onRemoveItem(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-orange-600 font-bold mb-3">${item.price}</p>
                    <div className="flex items-center gap-3 bg-gray-100 w-fit rounded-lg px-2 py-1">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="p-1 hover:bg-white rounded transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="p-1 hover:bg-white rounded transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-6 border-t bg-gray-50">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-500">總計金額</span>
              <span className="text-2xl font-black text-orange-600">${subtotal}</span>
            </div>
            <button 
              onClick={onCheckout}
              className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-orange-200 transition-all flex items-center justify-center gap-2"
            >
              立即結帳
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
