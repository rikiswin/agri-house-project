import GoogleSignInButton from "@/components/GoogleSignInButton";
import React from "react";
import AgriHouseLogo from "../../../assets/agrihouse-logo.png";
import AgriHouseBackground from "../../../assets/login-background.jpg";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      <div className="absolute -z-10 h-full w-full bg-gradient-to-r from-[#06224d] to-[#276b92] opacity-70"></div>
      <Image
        alt="AgriHouse Group Image"
        className="absolute -z-20 h-full w-full object-fill"
        height={1000}
        width={1000}
        src={AgriHouseBackground}
      />
      <div className="m-auto flex w-full max-w-96 flex-col items-center justify-center gap-8 rounded-xl bg-gradient-to-r from-[#060e4d] to-[#273492] p-12 text-center">
        <div className="rounded-full border-2">
          <Image
            className="max-w-16 rounded-full"
            alt="AgriHouse Logo"
            src={AgriHouseLogo}
            height={80}
            width={80}
          />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-white md:text-3xl lg:text-4xl">
          Welcome to AgriHouse
        </h1>
        <GoogleSignInButton />
      </div>
    </div>
  );
}
