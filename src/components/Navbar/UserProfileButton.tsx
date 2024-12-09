"use client";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";
import placeholderImage from "@/assets/profile_avatar_placeholder_large.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type UserProfileButtonProps = {
  session: Session | null;
};

export default function UserProfileButton({ session }: UserProfileButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image
          alt="User Image"
          height={40}
          width={40}
          className="rounded-full border-2 border-black transition-all duration-300 hover:cursor-pointer hover:brightness-90"
          src={session?.user?.image || placeholderImage}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => (session ? signOut() : signIn())}>
            {session ? "Log Out" : "Sign In"}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
