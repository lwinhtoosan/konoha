"use client";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { redirect, useParams } from "next/navigation";
import axios from "axios";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { UploadDropzone } from "@/app/lib/utils/uploadthing";
import CancelIcon from "@mui/icons-material/Cancel";
import Image from "next/image";

export default function EditBookPage() {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const { id } = params;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const getBookDetails = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}books/${id}`
    );
    setBook(response.data);
    setLoading(false);
  };
  useEffect(() => {
    getBookDetails();
  }, [id]); //Run This Effect whenever id change

  const handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };
  //[e.target.name] is name and the other is value

  const handleCheckBoxChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.checked });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const payLoad = {
      ...book,
      price: parseFloat(book.price) || 0,
      published_year: parseInt(book.published_year) || 0,
    };
    await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}books/${id}`, payLoad);
    console.log("payload", payLoad);
    alert("Successful updated");
    redirect(`/admin/books/${id}/bookDetails`);
  };

  const cancelImage = () => {
    setBook((prev) => ({ ...prev, imageUrl: null }));
  };
  if (loading) return <Typography mt={10}>loading....</Typography>;
  return (
    <Box
      component={"form"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      mt={10}
    >
      <Box
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
        gap={isMobile ? 15 : 53}
        mb={isMobile ? 2 : 4}
      >
        <Link passHref href={`/admin/books/${id}/bookDetails`}>
          <Button variant="outlined" size={isMobile ? "small" : "medium"}>
            <ArrowBackIcon />
          </Button>
        </Link>
        <Typography fontSize={isMobile ? 15 : 30}>Edit book</Typography>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        width={isMobile ? "80%" : "50%"}
        gap={isMobile ? 1 : 2}
      >
        {/* TextField must include name , label , value and also should fullWidth */}

        <TextField
          fullWidth
          label="Title"
          name="title"
          value={book.title || ""}
          onChange={handleChange}
        ></TextField>
        <TextField
          fullWidth
          name="author"
          label="Author"
          value={book.author || ""}
          onChange={handleChange}
        ></TextField>
        <TextField
          fullWidth
          name="price"
          label="Price"
          value={book.price}
          onChange={handleChange}
        ></TextField>
        <TextField
          fullWidth
          name="published_year"
          label="Published year"
          value={book.published_year}
          onChange={handleChange}
        ></TextField>
        <TextField
          fullWidth
          name="destribution"
          label="Destribution"
          value={book.destribution || ""}
          onChange={handleChange}
        ></TextField>
        <TextField
          fullWidth
          name="genre"
          label="Genre"
          value={book.genre || ""}
          onChange={handleChange}
        ></TextField>
        <TextField
          fullWidth
          name="description"
          label="Description"
          value={book.description || ""}
          onChange={handleChange}
        ></TextField>

        <Box width={"100%"} display={"flex"} justifyContent={"flex-start"}>
          <FormControlLabel
            control={
              <Checkbox
                name="inStock"
                checked={book.inStock}
                onChange={handleCheckBoxChange}
              />
            }
            label="inStock"
            labelPlacement="start"
          ></FormControlLabel>
        </Box>

        <Box>
          {book?.imageUrl && (
            <Box>
              <CancelIcon
                onClick={cancelImage}
                sx={{ color: "red", position: "absolute" }}
              />
              <Image
                src={book.imageUrl}
                alt="book cover"
                width={isMobile ? 100 : 200}
                height={isMobile ? 100 : 200}
                style={{ borderRadius: 3 }}
              ></Image>
            </Box>
          )}
        </Box>

        <UploadDropzone
          endpoint={"imageUploader"}
          onClientUploadComplete={(res) => {
            const imageUrl = res?.[0]?.url ?? res?.[0]?.ufsUrl ?? null;
            if (imageUrl) {
              setBook((prev) => ({ ...prev, imageUrl }));
              alert("Upload complete");
            }
          }}
          onUploadError={(error) => alert("Uploading error", `${error.name}`)}
        />
      </Box>
      <Button variant="contained" onClick={handleUpdate} sx={{ mt: 2 }}>
        UPDATE
      </Button>
    </Box>
  );
}
