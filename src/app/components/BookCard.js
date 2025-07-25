"use client";
import {
  Box,
  Card,
  Button,
  CardActions,
  CardMedia,
  Typography,
  Skeleton,
} from "@mui/material";
import { useTheme } from "@emotion/react/";
import useMediaQuery from "@mui/material/useMediaQuery";

import Link from "next/link";
import { useState } from "react";
import { Scale } from "@mui/icons-material";

export default function BookCard({ book }) {
  if (!book) return null;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isHovered, setIsHovered] = useState(false);
  return (
    
    <Card
      sx={{
        width: isMobile ? 100 : 200,
        height: isMobile ? 150 : 300,
        overflow: "hidden",
        position: "relative",
        borderRadius: isMobile ? 1 : 3,
        "&:hover .overlay-button": {
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(5px)",
        },
      }}
      elevation={5}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!book.imageUrl ? (
        <Skeleton variant="rectangular" height={isMobile ? "65%" : "80%"} />
      ) : (
        <CardMedia
          component={"img"}
          image={book.imageUrl}
          alt={book.title}
          sx={{
            height: "100%",
            objectFit: "cover",
            display: "block",
            width: "100%",
            transform: isHovered ? "scale(1.1)" : "scale(1)",
            transition: "transform 0.5s  ease",
          }}
        />
      )}

      <CardActions
        sx={{
          position: "absolute",
          bottom: 5,
          right: isMobile ? 5 : 50,
          zIndex: 1,
        }}
      >
        <Link passHref href={`/customer/books/${book.id}/bookDetails`}>
          <Button
            size={isMobile ? "small" : "medium"}
            variant="outlined"
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(2px)",
              color: "white",
              border: "1px solid rgba(255, 255, 255, 0.1) ",
              borderRadius: "24px",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                border: "1px solid white",
                backdropFilter: "blur(5px)",
              },
            }}
          >
            DETAILS
          </Button>
        </Link>
      </CardActions>
    </Card>
   
  );
}
