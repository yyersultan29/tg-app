export interface MenuItem {
  id: number;
  name: string;
  emoji: string;
  price: number;
  category: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

