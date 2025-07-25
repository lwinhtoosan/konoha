"use client";
import { Box, Button, Input, TextField, Typography } from "@mui/material";
import { getCsrfToken, signIn } from "next-auth/react";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [csrfToken, setCsrfToken] = useState("");

  const router = useRouter();
  //add this csrfToken not to break or fail when sending custom login data to credentials
  //next auth use csrfProtection to secure post request to api/auth/callback/credentials
  //if its not include in the custom login form , the server will reject
  useEffect(() => {
    const fetchCsrf = async () => {
      const token = await getCsrfToken();
      setCsrfToken(token);
    };
    fetchCsrf();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    //get the session from api/auth (return session) to check role
    if (result.ok) {
      const SessionRes = await fetch("api/auth/session"); // "api/auth/session" nextauth built route
      const session = await SessionRes.json();
      const role = session?.user?.role;

      if ((role === "admin")) {
        router.push("/admin");
      } else if ((role === "customer")) {
        router.push("/customer");
      } else {
        router.push("/");
      }
    } else {
      setError("Invalid session");
    }
  };

  return (
    <Box>
      <Box
        component={"form"}
        onSubmit={handleSubmit}
        mt={20}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={2}
      >
        <Input name="csrfToken" type="hidden" value={csrfToken} />
        <TextField
          label="Email"
          name="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        ></TextField>
        <TextField
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        ></TextField>
        <Box>
          <Button type="submit">Log In</Button>
        </Box>
      </Box>
      <Typography> Or </Typography>
      <Box>
        <Button
          variant="outlined"
          onClick={(e) => {
            e.preventDefault();
            signIn("google", { callbackUrl: "/login/redirect" });
          }}
        >
          signIn with google
        </Button>
      </Box>
    </Box>
  );
}
