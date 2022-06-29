import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProductsProvider } from 'context';
import { Cart } from 'components/Cart';
import { Products } from 'components/Products';

export const App: React.FC = () => {
  const iframe = document.querySelector('iframe');
  iframe?.remove();
  return (
    <div>
      <ProductsProvider>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </ProductsProvider>
    </div>
  );
};
