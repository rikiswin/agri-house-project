import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AddCricketDataForm from "@/components/AddCricketDataForm";

export default async function page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="flex min-h-screen flex-col px-4 lg:px-0 pt-28 pb-6">
      <AddCricketDataForm />
    </div>
  );
}
