"use client";
import { useTheme } from "@emotion/react";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Profile() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { data: session, status } = useSession();
  if (status === "loading") return <p> Loading... </p>;

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
     
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box sx={{ borderRadius: "50%" }}>
          <Image
            src={"/images/profile.jpg"}
            alt="profile"
            width={isMobile ? 50 : 100}
            height={isMobile ? 50 : 100}
          ></Image>
        </Box>
        <Typography variant="h4" fontWeight={"bold"} color="orange">
          {" "}
          Welcome , {session?.user?.name}
        </Typography>
      </Box>
      <Button onClick={() => signOut()}>Log Out</Button>
    </Box>
  );
}
