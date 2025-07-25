"use client";
import { useTheme } from "@emotion/react";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { signIn } from "next-auth/react";
// import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function signInSignOut() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  // const { data: session, status } = useSession();
  // if (status === "loading") return <p> Loading... </p>;

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      marginTop={30}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Image
          src={"/images/konoha.png"}
          alt="konoha"
          width={isMobile ? 50 : 100}
          height={isMobile ? 50 : 100}
        ></Image>
        <Typography variant="h4" fontWeight={"bold"} color="orange">
          You need to sing in first.
        </Typography>
        <Typography variant="subtitled2">
          if you already have an account ?
          <Button variant="text" onClick={() => signIn()}>
            signIn
          </Button>
        </Typography>

        <Link passHref href={"/register"}>
          <Button variant="contained" sx={{ bgcolor: "red" }}>
            Register
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
