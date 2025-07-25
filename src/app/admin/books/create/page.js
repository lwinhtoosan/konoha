"use client";
import {
  Box,
  Button,
  FormControlLabel,
  Paper,
  TextField,
  Checkbox,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { UploadDropzone } from "@/app/lib/utils/uploadthing";

export default function CreateBookPage() {
  const [book, setBook] = useState({ inStock: true });
  const router = useRouter();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };
  const handleCheckBoxChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.checked });
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    const payLoad = {
      ...book,
      price: parseFloat(book.price),
      published_year: parseInt(book.published_year),
      imageUrl: book.imageUrl,
      inStock: book.inStock,
    };
    console.log("payLoad", payLoad);

    await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}books`, payLoad);
    alert("Creating book success.");
    router.push("/admin/books");
  };

  // if (loading) return <Typography mt={10}>loading....</Typography>;
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
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        width={isMobile ? "80%" : "50%"}
        gap={isMobile ? 1 : 2}
      >
        <Typography variant="h4">Create book</Typography>

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
          value={book.price || ""}
          onChange={handleChange}
        ></TextField>
        <TextField
          fullWidth
          name="published_year"
          label="Published year"
          value={book.published_year || ""}
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

        {/* /* Uploading image */}
        <Box border={1} borderColor={"gray"} borderRadius={3} padding={2}>
          {book.imageUrl && (
            <Box>
              <Typography>Preview:</Typography>
              <Paper>
                <img
                  src={book?.imageUrl}
                  alt="Uploading image"
                  width={150}
                  height={150}
                  style={{ objectFit: "cover" }}
                ></img>
              </Paper>
            </Box>
          )}
          <Typography sx={{ fontStyle: "italic", color: "gray" }}>
            //click or drag here to upload image
          </Typography>
          <UploadDropzone
            endpoint={"imageUploader"}
            onClientUploadComplete={(res) => {
              const imageUrl = res?.[0]?.ufsUrl ?? null;
              if (imageUrl) {
                setBook((prev) => ({ ...prev, imageUrl }));
              }
              console.log(imageUrl);
              alert("Upload success!");
            }}
            onUploadError={(error) => alert("Upload fail:"`${error.name}`)}
          ></UploadDropzone>
        </Box>
      </Box>
      <Button variant="contained" onClick={handleUpdate} sx={{ mt: 2 }}>
        SAVE
      </Button>
    </Box>
  );
}
