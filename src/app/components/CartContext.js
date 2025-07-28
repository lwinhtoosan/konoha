"use client";
import axios from "axios";
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
            ? { ...item, quantity: item.quantity + quantity }
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

  //total price
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  //Total items for navBar badge
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  //Place order
  const placeOrder = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      const orderData = {
        items: cart,
        amount: totalPrice,
      };
      const res = await axios.post("/api/order", orderData);

      setCart([]);
      alert("Place order successful.");
    } catch (error) {
      console.log(error);
      alert("Placing order failed.");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalQuantity,
        placeOrder,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
