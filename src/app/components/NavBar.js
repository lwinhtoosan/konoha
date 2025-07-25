"client";
import { signOut } from "next-auth/react";
import { useTheme } from "@emotion/react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { orange } from "@mui/material/colors";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Register", path: "/register" },
    {title: "Logout" , path: "/login"}
  ];
  return (
    <Box>
      <AppBar position="absolute" sx={{ backgroundColor: "white" }}>
        <Toolbar>
          <Stack flexGrow={1} flexDirection={"row"} alignItems={"center"}>
            <Image
              src={"/images/konoha.png"}
              alt="konoha"
              width={isMobile ? 30 : 50}
              height={isMobile ? 30 : 50}
            ></Image>
            <Typography color="orange">KONOKA</Typography>
          </Stack>

          {!isMobile && (
            <Box>
              {navLinks.map((link, index) => (
                <Link passHref href={link.path} key={index}>
                  <Button sx={{ color: "orange" }}>{link.title}</Button>
                </Link>
              ))}
            </Box>
          )}

          {isMobile && (
            <IconButton
              sx={{ color: "orange" }}
              edge="end"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            <Box
              width={200}
              role="presentation"
              onClick={() => setDrawerOpen(false)}
            >
              <List>
                {navLinks.map((link, index) => (
                  <ListItem key={index}>
                    <Link passHref href={link.path}>
                      <Button sx={{color:"orangered"}}>{link.title}</Button>
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
