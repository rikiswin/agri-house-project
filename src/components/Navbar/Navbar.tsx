import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import UserProfileButton from "./UserProfileButton";
import Link from "next/link";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const menuOptions = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Add Cricket Data",
      link: "/cricket/add",
    },
    {
      name: "Chat",
      link: "/chat",
    },
    {
      name: "Train",
      link: "/train",
    },
  ];
  return (
    <div className="fixed top-0 mx-auto flex min-h-12 w-full items-center border-b bg-slate-50 px-5">
      <div className="mx-auto flex w-full max-w-4xl justify-between">
        <div className="flex items-center gap-5">
          {menuOptions.map((option, index) => (
            <Link
              className={`${(option.name == "Chat" || option.name == "Train") && "hover:cursor-not-allowed"}`}
              key={index}
              href={`${(option.name == "Chat" || option.name == "Train") ? "/" : option.link}`}
            >
              {option.name}
            </Link>
          ))}
        </div>
        <UserProfileButton session={session} />
      </div>
    </div>
  );
}
