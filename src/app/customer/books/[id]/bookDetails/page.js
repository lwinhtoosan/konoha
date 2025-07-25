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
  Typography,
} from "@mui/material";

import Link from "next/link";

export default function BookDetails() {
  const params = useParams();
  console.log("params", params);
  const { id } = params;
 

  const [book, setBook] = useState([]);

  const [expand, setExpand] = useState(false);
  const MAX_CHARS = 20;

  console.log("id", params);

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
  const displayDescription =
    !expand && book.description?.length > MAX_CHARS
      ? `${book.description.slice(0, MAX_CHARS)}...`
      : book.description;
  return (
    <Box
      mt={10}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
    >
      <Card sx={{ width: "50%", height:550 }}>
        <CardMedia
        
          component={"img"}
          alt={book.title}
          height={250}
          src={book.imageUrl}
          sx={{objectFit:"contained" }}
        />
        <CardContent>
          <Typography>{book.title}</Typography>
          <Typography>by {book.author}</Typography>
          <Typography>
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
          <Typography>{book.price} MMK</Typography>
          <Typography>
            Published : {book.published_year}, Distributed by :
            {book.destribution}
          </Typography>
          <Stack direction={"row"} mb={1}>
            <Typography>Genre:</Typography>
            {book?.genre?.length > 0 ? (
              <Chip label={book.genre} size="small" color="primary" />
            ) : (<Typography color="grey" ml={1}>unknown</Typography>)}
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
        </CardContent>
        <CardActions>
          {/* <Link> */}
            <Button size="small" >
              Add to Cart
            </Button>
          {/* </Link> */}
        </CardActions>
      </Card>
    </Box>
  );
}
