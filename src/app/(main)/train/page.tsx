"use client";

import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const session = useSession();

  if (session.status !== "authenticated") {
    redirect("/login");
  }
  return (
    <main>
      <div className="items-center justify-between p-24">
        <FilePond
          allowMultiple={false}
          credits={false}
          server={{
            url: "/api/upload",
          }}
        />
      </div>
    </main>
  );
}
