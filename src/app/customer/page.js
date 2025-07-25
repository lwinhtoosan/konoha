"use client";
import { Box, Grid, Typography } from "@mui/material";
import Profile from "../profile/profile";
import BookCard from "../components/BookCard";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CustomerPage() {
  const [books, setBooks] = useState([]);

  const getBookData = async () => {
    const response = await axios.get("/api/customerBooks");
    setBooks(response.data);
  };
  console.log("books", books);
  console.log();
  useEffect(() => {
    getBookData();
  }, []);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Typography mt={20}>Welcome you are a customer.</Typography>
      <Profile />
      <Box flexGrow={1}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 3, md: 8 }}
          justifyContent={"center"}
        >
          {books.map((book, index) => (
            <Grid key={book.id}>
              <BookCard book={book} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
