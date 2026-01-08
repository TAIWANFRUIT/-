
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User } from 'lucide-react';
import { getMealRecommendation } from '../services/geminiService';
import { MENU_DATA } from '../constants';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'ai' | 'user', text: string}[]>([
    { role: 'ai', text: '你好！我是帝國雞 AI 點餐助手，今天想吃點什麼呢？不論是炸雞、便當還是飲料，我都能給你最好的建議！' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setLoading(true);

    const recommendation = await getMealRecommendation(userText, MENU_DATA);
    setMessages(prev => [...prev, { role: 'ai', text: recommendation }]);
    setLoading(false);
  };

  return (
    <>
      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-orange-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 group"
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
        {!isOpen && (
          <span className="absolute -top-12 right-0 bg-white text-orange-600 text-xs font-bold px-3 py-1 rounded-full border shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            需要 AI 建議嗎？
          </span>
        )}
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-24 right-6 w-[calc(100vw-3rem)] max-w-sm h-[500px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col z-40 transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
        <div className="bg-orange-600 p-4 text-white flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Bot size={24} />
          </div>
          <div>
            <h3 className="font-bold">AI 點餐助手</h3>
            <p className="text-xs text-orange-100">正在線為您服務</p>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-gray-50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                msg.role === 'user' 
                  ? 'bg-orange-600 text-white rounded-tr-none' 
                  : 'bg-white text-gray-800 border shadow-sm rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white p-3 rounded-2xl border shadow-sm rounded-tl-none flex gap-1">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t bg-white flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="請輸入您的點餐需求..."
            className="flex-1 px-4 py-2 bg-gray-100 rounded-full outline-none focus:ring-2 focus:ring-orange-500 transition-all text-sm"
          />
          <button 
            onClick={handleSend}
            disabled={loading}
            className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center hover:bg-orange-700 disabled:opacity-50 transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </>
  );
};

export default AIAssistant;
