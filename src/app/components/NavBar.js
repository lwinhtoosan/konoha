"use client";
import { useTheme } from "@emotion/react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "./CartContext";

export default function NavBar() {
  const { totalQuantity } = useCart();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  // const [cartCount, setCartCount] = useState(0);
  // const updateCartCount = () => {
  //   const storedCart = localStorage.getItem("cart");
  //   const cart = storedCart ? JSON.parse(storedCart) : [];
  //   const count = cart.reduce((acc, item) => acc + item.quantity, 0);
  //   setCartCount(count);
  // };
  // useEffect(() => {
  //   updateCartCount();
  //   window.addEventListener("UpdatedCart", updateCartCount);
  //   return () => {
  //     window.removeEventListener("UpdatedCart", updateCartCount);
  //   };
  // }, []);

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Register", path: "/register" },
  ];
  return (
    <Box>
      <AppBar position="fixed" sx={{ backgroundColor: "white" }}>
        <Toolbar>
          <Stack flexGrow={1} flexDirection={"row"} alignItems={"center"}>
            <Image
              src={"/images/konoha.png"}
              alt="konoha"
              width={isMobile ? 30 : 50}
              height={isMobile ? 30 : 50}
            ></Image>
            <Typography color="orange">KONOKA</Typography>
          </Stack>

          {!isMobile && (
            <Box display={"flex"} alignItems={"center"}>
              {navLinks.map((link, index) => (
                <Link passHref href={link.path} key={index}>
                  <Button sx={{ color: "orange" }}>{link.title}</Button>
                </Link>
              ))}
              <Link passHref href={"/customer/cart"}>
                <IconButton sx={{ display: "flex", flexDirection: "column" }}>
                  <Badge
                    badgeContent={totalQuantity}
                    sx={{ color: "red", mb: 0.1 }}
                  />
                  <ShoppingCartIcon sx={{ color: "orange" }} />
                </IconButton>
              </Link>
            </Box>
          )}

          {isMobile && (
            <IconButton
              sx={{ color: "orange" }}
              edge="end"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            <Box
              width={200}
              role="presentation"
              onClick={() => setDrawerOpen(false)}
            >
              <List>
                {navLinks.map((link, index) => (
                  <ListItem key={index}>
                    <Link passHref href={link.path}>
                      <Button sx={{ color: "orangered" }}>{link.title}</Button>
                    </Link>
                  </ListItem>
                ))}
                <ListItem>
                  <Link passHref href={"/customer/cart"}>
                    <IconButton>
                      <Badge badgeContent={totalQuantity} />
                      <ShoppingCartIcon sx={{ color: "orangered" }} />
                    </IconButton>
                  </Link>
                </ListItem>
              </List>
            </Box>
          </Drawer>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
