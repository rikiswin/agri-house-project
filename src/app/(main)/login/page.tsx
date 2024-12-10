import GoogleSignInButton from "@/components/GoogleSignInButton";
import React from "react";

export default function page() {
  return (
    <div className="flex min-h-screen">
      <div className="m-auto h-52 w-52 flex items-center justify-center border-2">
        <GoogleSignInButton />
      </div>
    </div>
  );
}
