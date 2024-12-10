import { redirect } from "next/navigation";
import FileUploadSection from "@/components/FileUploadSection";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return (
    <main>
      <FileUploadSection />
    </main>
  );
}
