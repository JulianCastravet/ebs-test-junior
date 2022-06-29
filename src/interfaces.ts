export interface Product {
  id: number;
  name: string;
  price: number;
  category: Category;
}
export interface CartItem {
  id: number;
  name: string;
  price: number;
  category: Category;
  quantity: number;
}
export interface Category {
  id: string;
  name: string;
}
export interface ProductContextType {
  products: Product[];
  cartItems: CartItem[];
  fetchProducts: () => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
}
