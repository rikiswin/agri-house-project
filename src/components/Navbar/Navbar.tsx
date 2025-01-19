import React from "react";
import Link from "next/link";
import Image from "next/image";
import AgriHouseLogo from "../../assets/agrihouse-logo.png";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { Button } from "../ui/button";

export default async function Navbar() {
  const menuOptions = [
    {
      name: "Dashboard",
      link: "/dashboard",
    },
  ];
  return (
    <header className="fixed z-50 top-0 mx-auto flex min-h-12 w-full items-center border-b bg-slate-50 px-5 py-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="grid gap-2 py-6">
            {menuOptions.map((option, index) => (
              <Link
                className="flex w-full items-center py-2 text-lg font-semibold tracking-tight"
                prefetch={false}
                key={index}
                href={option.link}
              >
                {option.name}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
      <div className="mx-auto flex w-full max-w-4xl items-center justify-end lg:justify-between">
        <div className="hidden items-center gap-5 lg:flex">
          <Link
            href={"/dashboard"}
            prefetch={false}
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
            <Link
              className="relative block text-lg tracking-tighter after:absolute after:block after:h-[3px] after:w-full after:origin-left after:scale-x-0 after:bg-black after:transition after:duration-300 after:content-[''] after:hover:scale-x-100"
              key={index}
              href={option.link}
              prefetch={false}
            >
              {option.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
