
import React, { useState } from 'react';
import { X, CheckCircle, Package, Truck } from 'lucide-react';
import { OrderInfo } from '../types';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (info: OrderInfo) => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [info, setInfo] = useState<OrderInfo>({
    name: '',
    phone: '',
    address: '',
    pickupType: 'delivery',
    note: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onSubmit(info);
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        {submitted ? (
          <div className="p-12 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
              <CheckCircle size={48} />
            </div>
            <h2 className="text-2xl font-bold mb-2">訂單已送出！</h2>
            <p className="text-gray-500">帝國雞正在為您準備美食，請耐心等候。</p>
          </div>
        ) : (
          <>
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-bold">填寫訂購資訊</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setInfo({ ...info, pickupType: 'delivery' })}
                  className={`flex items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                    info.pickupType === 'delivery' 
                    ? 'border-orange-600 bg-orange-50 text-orange-600 font-bold' 
                    : 'border-gray-200 text-gray-400 hover:border-gray-300'
                  }`}
                >
                  <Truck size={20} />
                  外送到府
                </button>
                <button
                  type="button"
                  onClick={() => setInfo({ ...info, pickupType: 'pickup' })}
                  className={`flex items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                    info.pickupType === 'pickup' 
                    ? 'border-orange-600 bg-orange-50 text-orange-600 font-bold' 
                    : 'border-gray-200 text-gray-400 hover:border-gray-300'
                  }`}
                >
                  <Package size={20} />
                  到店自取
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
                  <input
                    required
                    type="text"
                    value={info.name}
                    onChange={(e) => setInfo({ ...info, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                    placeholder="點餐者姓名"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">聯絡電話</label>
                  <input
                    required
                    type="tel"
                    value={info.phone}
                    onChange={(e) => setInfo({ ...info, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                    placeholder="手機號碼"
                  />
                </div>
                {info.pickupType === 'delivery' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">外送地址</label>
                    <input
                      required
                      type="text"
                      value={info.address}
                      onChange={(e) => setInfo({ ...info, address: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                      placeholder="詳細外送地址"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">備註 (可選)</label>
                  <textarea
                    value={info.note}
                    onChange={(e) => setInfo({ ...info, note: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all h-24"
                    placeholder="不加辣、飲料去冰..."
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl font-bold text-lg shadow-lg transition-all"
              >
                確認送出訂單
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderModal;
