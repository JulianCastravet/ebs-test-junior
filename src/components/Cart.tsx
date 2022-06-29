import React, { FC, useCallback, useContext } from 'react';
import { CartItem } from 'interfaces';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from 'context';

export const Cart: FC = () => {
  const { cartItems, addToCart, removeFromCart } = useContext(ProductContext);

  const navigate = useNavigate();

  const handleGoToProducts = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleRemoveProduct = useCallback(
    (id) => {
      removeFromCart(id);
    },
    [removeFromCart],
  );

  const handleAddToCart = useCallback(
    (item: CartItem) => {
      addToCart(item);
    },
    [addToCart],
  );

  return (
    <div style={{ margin: '50px' }}>
      <button onClick={handleGoToProducts} className="goto">
        Go To Products
      </button>

      <table>
        <thead>
          <tr>
            <th>CATEGORY</th>
            <th>NAME</th>
            <th>QUANTITY</th>
            <th>PRICE</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((product: CartItem) => {
            return (
              <tr key={product.id}>
                <td> {product.category.name}</td>
                <td> {product.name}</td>
                <td>{product.quantity}</td>
                <td>{product.price}</td>
                <td>
                  <button onClick={() => handleRemoveProduct(product.id)}>Remove</button> Select{' '}
                  <button onClick={() => handleAddToCart(product)}>Add</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
