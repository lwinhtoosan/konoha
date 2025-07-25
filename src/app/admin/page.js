"use client";
import { Typography } from "@mui/material";
import Profile from "../profile/profile";
import ViewBooksTable from "./books/page";
import { useSession } from "next-auth/react";

export default function AdminPage() {
  const session = useSession();
  console.log(session);

  return (
    <div>
      <Profile />
      <ViewBooksTable />
    </div>
  );
}
