import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import UserProfileButton from "./UserProfileButton";
import Link from "next/link";
import Image from "next/image";
import AgriHouseLogo from "../../assets/agrihouse-logo.png";

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
    <div className="fixed top-0 mx-auto flex min-h-12 w-full items-center border-b bg-slate-50 px-5 py-2">
      <div className="mx-auto flex w-full max-w-4xl items-center justify-between">
        <div className="flex items-center gap-5">
          <Link
            href={"/"}
            className="rounded-full border-2 hover:brightness-90"
          >
            <Image
              className="max-w-16 rounded-full"
              alt="AgriHouse Logo"
              src={AgriHouseLogo}
              height={80}
              width={80}
            />
          </Link>
          {menuOptions.map((option, index) => (
            <Link key={index} href={option.link}>
              {option.name}
            </Link>
          ))}
        </div>
        <UserProfileButton session={session} />
      </div>
    </div>
  );
}
