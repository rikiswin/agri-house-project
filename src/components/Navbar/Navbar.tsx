import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import UserProfileButton from "./UserProfileButton";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  return (
    <div className="fixed top-0 mx-auto flex min-h-12 w-full items-center border-b bg-slate-50">
      <div className="mx-auto flex w-full max-w-4xl justify-between">
        {/* TODO: Add menu? */}
        <div></div>
        <UserProfileButton session={session} />
      </div>
    </div>
  );
}
