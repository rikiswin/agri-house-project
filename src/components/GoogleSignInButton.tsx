"use client";
import React from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

export default function GoogleSignInButton() {
  return <Button onClick={() => signIn()}>Google Login</Button>;
}
