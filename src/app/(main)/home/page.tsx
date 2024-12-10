import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/authOptions";
import { deleteCricketData, getCricketData } from "@/lib/db/cricketData";
import { Trash2 } from "lucide-react";
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
        {cricketData && cricketData.length > 0 ? (
          cricketData.map((data) => (
            <div key={data.id} className="flex gap-5">
              <div>
                <p>Cost: {data.cost}</p>
                <p>Type: {data.type}</p>
                <p>Amount: {data.amount}</p>
              </div>
              <form action={deleteCricketData} className="flex items-center">
                <input
                  id="cricketDataId"
                  name="cricketDataId"
                  hidden
                  readOnly
                  value={data.id}
                />
                <Button>
                  Delete <Trash2 />
                </Button>
              </form>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground">
            There are currently no entries for cricket data. Please add some
            cricket data.
          </p>
        )}
      </div>
    </div>
  );
}
