import GoogleSignInButton from "@/components/GoogleSignInButton";
import React from "react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen px-4">
      <div className="m-auto flex flex-col items-center justify-center gap-8 rounded-xl border-2 p-12 text-center shadow">
        <h1 className="text-xl font-extrabold tracking-tight text-black md:text-3xl lg:text-4xl">
          Login Options
        </h1>
        <GoogleSignInButton />
      </div>
    </div>
  );
}
