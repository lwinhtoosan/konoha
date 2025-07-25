import Profile from "./profile";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default function ProfilePage() {
  const session = getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }
  return (
    <div>
      <Profile />
    </div>
  );
}
