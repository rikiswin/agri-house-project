
import { authOptions } from "@/lib/authOptions";
import { getCricketData } from "@/lib/db/cricketData";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const cricketData = await getCricketData();
  return (
    <div className="flex min-h-screen">
      <div className="m-auto flex flex-col items-center justify-center gap-5">
        {cricketData &&
          cricketData.map((data) => (
            <div key={data.id}>
              <p>Cost: {data.cost}</p>
              <p>Type: {data.type}</p>
              <p>Amount: {data.amount}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
