"use client";
import AuthProvider from "../components/AuthProvider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
export default function AdminLayout({ children }) {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CssBaseline />
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
}
