"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Stack,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "@/app/components/CartContext";
export default function CartPage() {
  const { updateQuantity, removeFromCart, cart , placeOrder, totalPrice} = useCart();

  // useEffect(() => {
  //   const stored = localStorage.getItem("cart");
  //   setCartItems(stored ? JSON.parse(stored) : []);
  // }, []);

  // const updatedQuantity = (id, qty) => {
  //   const newQty = Math.max(1, parseInt(qty) || 1);
  //   const update = cartItems.map((item) =>
  //     item.id === id ? { ...item, quantity: newQty } : item
  //   );
  //   setCartItems(update);
  //   localStorage.setItem("cart", JSON.stringify(update));
  //   window.dispatchEvent(new Event("UpdatedCart"));
  // };

  // const removeItem = (id) => {
  //   const update = cartItems.filter((item) => item.id !== id);
  //   setCartItems(update);
  //   localStorage.setItem("cart", JSON.stringify(update));
  //   window.dispatchEvent(new Event("UpdatedCart"));
  // };

  
  return (
    <Box mt={10} p={2}>
      <Typography variant="h4">Your Cart</Typography>
      {cart.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <Stack spacing={2}>
          {cart.map((item) => (
            <Card
              key={item.id}
              sx={{
                display: "flex",
                alignItems: "center",
                p: 1,
              }}
            >
              <CardMedia
                component={"img"}
                image={item.imageUrl}
                sx={{ width: 100, objectFit: "contain" }}
              />
              <CardContent>
                <Typography fontWeight={"bold"}>
                  {item.title} ({item.author})
                </Typography>
                <Typography>Price: {item.price} MMK</Typography>
                <Box
                  display={"flex"}
                  flexDirection={"row"}
                  alignItems={"center"}
                  mt={2}
                >
                  <TextField
                    type="number"
                    name="quantity"
                    label="Quantity"
                    value={item.quantity}
                    sx={{ width: 80 }}
                    onChange={(e) => updateQuantity(item.id, e.target.value)}
                  ></TextField>
                  <Button
                    onClick={() => removeFromCart(item.id)}
                    color="error"
                    sx={{ ml: 1 }}
                    startIcon={<DeleteIcon />}
                  >
                    REMOVE
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
          <Divider />
          <Box display={"flex"} alignItems={"center"} justifyContent={"space-around"}>
            <Typography variant="h6">Total : {totalPrice} MMK</Typography>
            <Button variant="contained" onClick={() => placeOrder(amount)}>Place order</Button>
          </Box>
        </Stack>
      )}
    </Box>
  );
}
