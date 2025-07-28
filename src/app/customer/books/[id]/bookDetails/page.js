"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useCart } from "@/app/components/CartContext";
import Link from "next/link";
import { useTheme } from "@emotion/react";
import useMediaQuery from "@mui/material/useMediaQuery";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";

export default function BookDetails() {
  const { addToCart } = useCart();
  const params = useParams();
  console.log("params", params);
  const { id } = params;

  const [book, setBook] = useState([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [expand, setExpand] = useState(false);
  const MAX_CHARS = 20;
  const displayDescription =
    !expand && book.description?.length > MAX_CHARS
      ? `${book.description.slice(0, MAX_CHARS)}...`
      : book.description;

  // console.log("id", params);
  const [quantity, setQuantity] = useState(1);

  const handleChange = (e) => {
    const value = Math.max(1, Number(e.target.value));
    setQuantity(value);
  };

  //Add to card
  //local storage can store only string so use JSON.parse to change string to json method
  // const handleAddToCart = () => {
  //   const storedCart = localStorage.getItem("cart"); //items store under "cart" key
  //   const cart = storedCart ? JSON.parse(storedCart) : [];
  //   const newItem = {
  //     id: book.id,
  //     title: book.title,
  //     author: book.author,
  //     imageUrl: book.imageUrl,
  //     price: book.price,
  //     quantity,
  //   };

  //   //check the same items with id to update the quantity
  //   const existingItem = cart.findIndex((item) => item.id === book.id);
  //   if (existingItem > -1) {
  //     cart[existingItem].quantity += quantity;
  //   } else {
  //     cart.push(newItem);
  //   }

  //   //change the json data to string to store at local storage
  //   localStorage.setItem("cart", JSON.stringify(cart));

  //   window.dispatchEvent(new Event("UpdatedCart"));
  //   alert("Added to cart.");
  // };

  const viewBookDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}books/${id}`
      );
      console.log("anotherId", id);
      setBook(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  console.log("books", book);
  useEffect(() => {
    viewBookDetails();
  }, []);

  return (
    <Box
      mt={10}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
    >
      <Card sx={{ width: "40%", height: "100%" }}>
        <CardMedia
          component={"img"}
          alt={book.title}
          height={250}
          src={book.imageUrl}
          sx={{ objectFit: "contain" }}
        />
        <CardContent>
          <Typography fontSize={isMobile ? 15 : 20} fontWeight={"bold"}>
            {book.title}
          </Typography>
          <Typography fontSize={isMobile ? 10 : 15} fontStyle={"italic"}>
            Author: {book.author}
          </Typography>
          <Typography fontSize={isMobile ? 10 : 15} fontStyle={"italic"}>
            Descriptions:
            {displayDescription}
            {book.description?.length > MAX_CHARS && (
              <Button
                onClick={() => setExpand(!expand)}
                size="small"
                sx={{ transform: "none", ml: 1 }}
              >
                {expand ? "see less" : "see more"}
              </Button>
            )}
          </Typography>

          <Typography fontSize={isMobile ? 10 : 15} fontStyle={"italic"}>
            Published in: {book.published_year}, Distributed by :
            {book.destribution}
          </Typography>
          <Typography>Price: {book.price} MMK</Typography>
          <Stack direction={"row"} mb={1}>
            <Typography>Genre:</Typography>
            {book?.genre?.length > 0 ? (
              <Chip label={book.genre} size="small" color="primary" />
            ) : (
              <Typography color="grey" ml={1}>
                unknown
              </Typography>
            )}
          </Stack>
          <Stack direction={"row"}>
            <Typography mr={1}>Status:</Typography>
            <Chip
              label={book.inStock ? "Instock" : "Out Of Stock"}
              size="small"
              color={book.inStock ? "success" : "error"}
              sx={{ opacity: book.inStock ? 1 : 0.6 }}
            />
          </Stack>
          <Stack flexDirection={"row"} alignItems={"center"}>
            <Typography>Quantity:</Typography>
            <TextField
              type="number"
              value={quantity}
              onChange={handleChange}
              size="small"
              variant="standard"
              sx={{ width: 50, alignSelf: "center" }}
            ></TextField>
          </Stack>

          <Typography>Amount:{book.price * quantity} MMK</Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Typography fontSize={isMobile ? 10 : 15} color="primary">
            Add to cart:
          </Typography>

          <Button onClick={() => addToCart(book, quantity)} >
            <ShoppingCartIcon />
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
