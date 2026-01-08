
import React, { useState, useMemo } from 'react';
import { ShoppingCart, Utensils, Info, Phone, MapPin, Search } from 'lucide-react';
import { MENU_DATA, CATEGORIES } from './constants';
import { Product, CartItem, Category, OrderInfo } from './types';
import ProductCard from './components/ProductCard';
import CartSidebar from './components/CartSidebar';
import OrderModal from './components/OrderModal';
import AIAssistant from './components/AIAssistant';

function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('所有');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    return MENU_DATA.filter(p => {
      const matchCategory = activeCategory === '所有' || p.category === activeCategory;
      const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchTerm]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleFinalOrder = (info: OrderInfo) => {
    console.log("Finalizing order:", info, cartItems);
    setCartItems([]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center text-white">
              <Utensils size={24} />
            </div>
            <h1 className="text-2xl font-black text-orange-600 tracking-tighter">帝國雞 <span className="text-gray-400 text-sm font-normal ml-1">DIGUOJI</span></h1>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#" className="hover:text-orange-600 transition-colors">首頁</a>
            <a href="#menu" className="hover:text-orange-600 transition-colors">美味菜單</a>
            <a href="#about" className="hover:text-orange-600 transition-colors">關於我們</a>
            <a href="#contact" className="hover:text-orange-600 transition-colors">聯絡資訊</a>
          </div>

          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-gray-700 hover:text-orange-600 transition-colors"
          >
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-600 text-white text-[10px] flex items-center justify-center rounded-full font-bold border-2 border-white animate-pulse">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden bg-gray-900">
        <img 
          src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=1920" 
          alt="Banner" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="relative z-10 text-center px-4">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight drop-shadow-lg">
            這不只是炸雞，<br className="md:hidden" />這是<span className="text-orange-500">美食帝國</span>
          </h2>
          <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">
            每日新鮮配送溫體雞，搭配獨家祕製 12 道工序裹粉，炸出極致酥脆與肉汁的完美比例。
          </p>
          <div className="mt-8">
            <a href="#menu" className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-orange-900/40 transition-all inline-block">
              立即點餐
            </a>
          </div>
        </div>
      </section>

      {/* Menu Filter */}
      <section id="menu" className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 custom-scrollbar whitespace-nowrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as Category)}
                className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${
                  activeCategory === cat 
                  ? 'bg-orange-600 text-white shadow-lg' 
                  : 'bg-white text-gray-500 hover:bg-orange-50 hover:text-orange-600 border'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="搜尋美食..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart} 
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-gray-400">
            <Search size={48} className="mx-auto mb-4 opacity-20" />
            <p className="text-lg">找不到符合條件的產品...</p>
          </div>
        )}
      </section>

      {/* Footer Info Section */}
      <section id="about" className="bg-gray-100 py-20 mt-12">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mx-auto md:mx-0">
              <Utensils size={24} />
            </div>
            <h3 className="text-xl font-bold">嚴選食材</h3>
            <p className="text-gray-500">我們堅持與在地農場合作，每日配送當天現宰雞肉，保證每一口都是最新鮮的滋味。</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mx-auto md:mx-0">
              <Phone size={24} />
            </div>
            <h3 className="text-xl font-bold">快速外送</h3>
            <p className="text-gray-500">專業外送團隊配合，保證美食在最短時間內送到您手中，依然保有剛起鍋的酥脆口感。</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mx-auto md:mx-0">
              <MapPin size={24} />
            </div>
            <h3 className="text-xl font-bold">多元支付</h3>
            <p className="text-gray-500">支援各式行動支付、信用卡與現金付款，讓您訂餐更輕鬆、更便利。</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-gray-600 text-sm">© 2024 帝國雞美食連鎖 版權所有</p>
              <p className="text-gray-400 text-xs mt-1">Design with ❤️ for professional foodies</p>
            </div>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-orange-600 hover:text-white transition-all">FB</a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-orange-600 hover:text-white transition-all">IG</a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-orange-600 hover:text-white transition-all">LINE</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Overlays */}
      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={() => setIsOrderModalOpen(true)}
      />
      <OrderModal 
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        onSubmit={handleFinalOrder}
      />
      <AIAssistant />
    </div>
  );
}

export default App;
