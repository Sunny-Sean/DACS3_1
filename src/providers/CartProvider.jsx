import { createContext, useContext, useState } from "react";
import { randomUUID } from "expo-crypto";

const CartContext = createContext({
  items: [],
  addItem: () => {},
});

const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addItem = (product, size) => {
    const existingItem = items.find(
      (item) => item.product === product && item.size === size
    );

    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    }

    const newCartItem = {
      id: randomUUID(),
      product,
      product_id: product.id,
      size,
      quantity: 1,
    };

    setItems([newCartItem, ...items]);
  };

  const updateQuantity = (itemId, amount) => {
    const updatedItems = items
      .map((item) =>
        item.id !== itemId
          ? item
          : { ...item, quantity: item.quantity + amount }
      )
      .filter((item) => item.quantity > 0);
    setItems(updatedItems);
  };

  // console.log(items);

  const total = items
    .reduce((sum, item) => (sum += item.product.price * item.quantity), 0)
    .toFixed(2);

  function clearCart() {
    setItems([]);
  }

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, total }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
