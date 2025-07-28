"use client";
import { Typography } from "@mui/material";
import Profile from "../profile/profile";
import ViewBooksTable from "./books/page";

export default function AdminPage() {
  return (
    <div>
      <Profile />
      <ViewBooksTable />
    </div>
  );
}
