"use client";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  //Load cart from local storage
  // useEffect(() => {
  //   const storedCart = localStorage.getItem("cart");
  //   const cartItems = storedCart ? JSON.parse(storedCart) : [];
  //   setCart(cartItems);
  // }, []);

  // //save cart to local storage
  // useEffect(() => {
  //   localStorage.setItem("cart", JSON.stringify(cart));
  // },[cart]); //add [cart] to update whatever changes as dependency

  //add item to cart
  const addToCart = (book, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === book.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === book.id
            ? { ...book, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...book, quantity }];

      //save the updatedCart to localstorage
      // localStorage.setItem("cart", JSON.stringify(updatedCart));
      // //Dispatch event if other component is rely on it
      // window.dispatchEvent(new Event("UpdatedCart"));

      // return updatedCart;
    });
  };

  //Remove From Cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  //UpdateQuantity
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  //Total items for navBar badge
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, totalQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
