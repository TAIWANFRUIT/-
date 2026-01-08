
export type Category = '所有' | '招牌炸雞' | '精緻便當' | '特色單點' | '冷熱飲品';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: Category;
  description: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface OrderInfo {
  name: string;
  phone: string;
  address: string;
  pickupType: 'delivery' | 'pickup';
  note: string;
}
