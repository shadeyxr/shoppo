export type ProductType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export type CartItem = {
  quantity: number;
  size: string;
  data: ProductType;
};

export type cartType = CartItem[];
