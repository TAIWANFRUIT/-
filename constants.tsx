
import { Product } from './types';

export const MENU_DATA: Product[] = [
  {
    id: 1,
    name: "帝國黃金脆皮雞",
    price: 320,
    category: "招牌炸雞",
    description: "獨家祕製裹粉，外皮金黃酥脆，肉質鮮嫩多汁。",
    image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 2,
    name: "韓式大蒜鮮炸雞",
    price: 350,
    category: "招牌炸雞",
    description: "裹上甜辣韓式醬汁與滿滿的生蒜末，重口味首選。",
    image: "https://images.unsplash.com/photo-1569058242253-92a9c71f9867?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 3,
    name: "帝國秘製滷肉飯便當",
    price: 150,
    category: "精緻便當",
    description: "嚴選五花肉慢火熬製，配上當季時蔬與黃金滷蛋。",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 4,
    name: "香酥排骨飯便當",
    price: 180,
    category: "精緻便當",
    description: "傳統台式厚切排骨，醃漬入味，炸至香氣四溢。",
    image: "https://images.unsplash.com/photo-1614963326505-843868e1d83a?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 5,
    name: "黃金薯條",
    price: 60,
    category: "特色單點",
    description: "外脆內軟的經典美式薯條。",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 6,
    name: "酥炸雞皮",
    price: 80,
    category: "特色單點",
    description: "下酒、配茶的最佳良伴，酥脆不油膩。",
    image: "https://images.unsplash.com/photo-1614777986387-015c2a89b696?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 7,
    name: "帝國特調奶茶",
    price: 50,
    category: "冷熱飲品",
    description: "茶味濃厚，與奶香完美融合的經典好滋味。",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 8,
    name: "清爽氣泡飲",
    price: 45,
    category: "冷熱飲品",
    description: "解油膩的最佳選擇，冰涼暢快。",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=400"
  }
];

export const CATEGORIES: string[] = ['所有', '招牌炸雞', '精緻便當', '特色單點', '冷熱飲品'];
