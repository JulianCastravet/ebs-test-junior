import React, { FC, useCallback, useContext, useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from 'context';
import { CartItem, Product } from 'interfaces';

export const Products: FC = () => {
  const navigate = useNavigate();

  const handleGoToCart = useCallback(() => {
    navigate('/cart');
  }, [navigate]);

  const { products, addToCart, removeFromCart, fetchProducts } = useContext(ProductContext);
  const [priceFlag, setPriceFlag] = useState<boolean>(false);
  const [catFlag, setSortFlag] = useState<boolean>(false);
  const [idFlag, setIdFlag] = useState<boolean>(false);
  const [resortedArray, setResortedArray] = useState<Product[]>(products);

  useEffect(() => {
    fetchProducts();
    setResortedArray(products);
  }, [fetchProducts]);

  const handleSortByID = useCallback(() => {
    setIdFlag(!idFlag);
    setResortedArray(resortedArray.sort((a, b) => (idFlag ? a.id - b.id : b.id - a.id)));
  }, [idFlag, resortedArray]);

  const handleSortByCategory = useCallback(() => {
    setSortFlag(!catFlag);
    const newArr = resortedArray.sort((a, b): number => {
      return catFlag ? a.category.id.localeCompare(b.category.id) : b.category.id.localeCompare(a.category.id);
    });
    setResortedArray(newArr);
  }, [resortedArray, catFlag]);

  const handleSortByPrice = useCallback(() => {
    setPriceFlag(!priceFlag);
    setResortedArray(
      resortedArray.sort((a, b) => {
        return priceFlag ? a.price - b.price : b.price - a.price;
      }),
    );
  }, [resortedArray, priceFlag]);

  const handleRemoveFromCart = useCallback(
    (id: number) => {
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
      <button onClick={handleGoToCart} className="goto">
        Go To Cart
      </button>

      <table>
        <tbody>
          <tr>
            <th>
              <button onClick={handleSortByID}>ID</button>
            </th>
            <th>NAME</th>
            <th>
              <button onClick={handleSortByCategory}>CATEGORY</button>
            </th>
            <th>
              <button onClick={handleSortByPrice}>PRICE</button>
            </th>
            <th>ACTIONS</th>
          </tr>
          {resortedArray.map((cartItems) => {
            return (
              <tr key={cartItems.id}>
                <td>{cartItems.id}</td>
                <td> {cartItems.name}</td>
                <td> {cartItems.category.name}</td>
                <td>${cartItems.price}</td>
                <td>
                  <button onClick={() => handleRemoveFromCart(cartItems.id)}>REMOVE</button>{' '}Select{' '}
                  <button onClick={() => handleAddToCart({ ...cartItems, quantity: 1 })}>ADD</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
