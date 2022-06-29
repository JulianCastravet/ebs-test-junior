import React, { createContext, FC, useEffect, useState } from 'react';
import { ProductContextType, Product, CartItem } from 'interfaces';

const prodConstVal: ProductContextType = {
  products: [],
  cartItems: [],
  fetchProducts: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
};

export const ProductContext = createContext<ProductContextType>(prodConstVal);

export const ProductsProvider: FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [items, setItems] = useState<CartItem[]>(prodConstVal.cartItems);

  useEffect(() => {
    fetch('http://localhost:3001/api/products/')
      .then((data) => data.json())
      .then((res: Product[]) => {
        setProducts(res);
      });
  }, []);

  const fetchProducts = () => {
    return products;
  };

  const addToCart = (newItem: CartItem) => {
    setItems((prev) => {
      const foundItem = prev.find((el) => el.id === newItem.id);
      if (foundItem) {
        return prev.map((el) => (el.id === newItem.id ? { ...el, quantity: el.quantity + 1 } : el));
      } else {
        return [...prev, newItem];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setItems((prev) =>
      prev.reduce((acc, item) => {
        if (item.id === productId) {
          if (item.quantity === 1) return acc;
          return [...acc, { ...item, quantity: item.quantity - 1 }];
        } else {
          return [...acc, item];
        }
      }, [] as CartItem[]),
    );
  };

  return (
    <ProductContext.Provider value={{ addToCart, cartItems: items, products, removeFromCart, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
