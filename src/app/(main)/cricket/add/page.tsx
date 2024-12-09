import { addCricketData } from "@/server/api/cricketData/actions";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import TestForm from "@/components/TestForm";

export default async function page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="flex min-h-screen flex-col">
      <TestForm />
    </div>
  );
}
