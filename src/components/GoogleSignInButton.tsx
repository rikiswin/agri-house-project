"use client";
import React from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function GoogleSignInButton() {
  return (
    <Button
      className="flex w-full items-center bg-[#42bd9a] text-center text-lg font-medium hover:bg-[#4dd8b1]"
      onClick={() => signIn()}
    >
      <FcGoogle /> Continue with Google
    </Button>
  );
}
