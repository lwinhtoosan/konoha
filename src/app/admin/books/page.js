"use client";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import TablePagination from "@mui/material/TablePagination";

export default function ViewBooksTable() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  //table pagination handle
  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPages = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0); //Reset the page
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const getBookList = async (page, limit) => {
    console.log("Page", page);
    console.log("limit", limit);
    try {
      const response = await axios.get(
        `/api/books?page=${page + 1}&limit=${limit}` //if api endpoint is page1 , use {page+1}
      );
      setBooks(response.data.books);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.log("Data fetching error", error);
    }
  };

  console.log("BooksDetails", books);
  useEffect(() => {
    getBookList(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const removeBook = async (id) => {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}books/${id}`
    );
    getBookList(page, rowsPerPage);
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box
        border={1}
        bgcolor={"grey.100"}
        borderColor={"lightgray"}
        borderRadius={3}
        width={isMobile ? "90%" : "70%"}
        mb={2}
      >
        <Stack display={"flex"} flexDirection={"row"} p={2}>
          {!isMobile && (
            <Typography flexGrow={1} color="grey">
              Click the Add book button and create a book
            </Typography>
          )}
          <Link passHref href={"/admin/books/create"}>
            <Button variant="contained" size="small" startIcon={<AddIcon />}>
              Add book
            </Button>
          </Link>
        </Stack>
      </Box>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>No</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Author</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Published_year
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Destribution</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((book, index) => (
                <TableRow
                  key={book.id || index}
                  sx={{ bgcolor: index % 2 === 0 ? "grey.100" : "white" }}
                >
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.price}</TableCell>
                  <TableCell>{book.published_year}</TableCell>
                  <TableCell>{book.destribution}</TableCell>
                  <TableCell align="center">
                    <Link passHref href={`/admin/books/${book.id}/bookDetails`}>
                      <Button>
                        <VisibilityIcon />
                      </Button>
                    </Link>
                    <Button onClick={() => removeBook(book.id)}>
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {books.length === 0 && !error && (
                <TableRow>
                  <TableCell>There is no book.</TableCell>
                </TableRow>
              )}
              {error && (
                <TableRow>
                  <TableCell>{error}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <TablePagination
        component={"div"}
        count={totalCount}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPages}
        rowsPerPageOptions={[5, 10, 15]}
      />
    </Box>
  );
}
