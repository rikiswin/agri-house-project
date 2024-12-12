import { redirect } from "next/navigation";
import FileUploadSection from "@/components/FileUploadSection";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Train',
};

export default async function TrainPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return (
    <main className="">
      <FileUploadSection />
    </main>
  );
}
