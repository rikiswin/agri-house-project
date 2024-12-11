import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/authOptions";
import { getCricketFarmData } from "@/lib/db/cricketData";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import AddFarmForm from "@/components/Forms/AddFarmForm";
import Link from "next/link";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const cricketFarms = await getCricketFarmData();
  return (
    <div className="flex min-h-screen flex-col pt-14 lg:pt-20">
      <div className="mr-3 ms-auto mt-2 flex w-fit gap-3 lg:mr-12 lg:mt-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button>View All</Button>
          </SheetTrigger>
          <SheetContent side="bottom">
            {cricketFarms && cricketFarms.length > 0 ? (
              cricketFarms.map((data) => (
                <pre
                  key={data.id}
                  className="max-w-2xl whitespace-pre-wrap break-all"
                  id="json"
                >
                  {JSON.stringify(data)}
                </pre>
              ))
            ) : (
              <p className="text-muted-foreground">
                There are currently no entries for cricket data. Please add some
                cricket data.
              </p>
            )}
          </SheetContent>
        </Sheet>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-500">
              Add Farm
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom">
            <AddFarmForm />
          </SheetContent>
        </Sheet>
      </div>

      <div className="m-auto flex flex-col items-center justify-center gap-5">
        {/* NOTE: We can use these values to create markers on the map library. But
        we need to first uncomment latitude and longitude from the Schema. */}
        {/* TODO: Add map library here */}
        <h1>List of Cricket Farms</h1>
        {cricketFarms && cricketFarms.length > 0 ? (
          cricketFarms.map((data) => (
            <Link
              key={data.id}
              href={`/dashboard/cricket/farm/${data.id}`}
              className="mr-3 ms-auto mt-2 h-fit w-fit rounded-xl border-2 bg-white p-3 text-black hover:bg-slate-100 lg:mr-12 lg:mt-3"
            >
              <pre
                className="max-w-2xl whitespace-pre-wrap break-all"
                id="json"
              >
                {JSON.stringify(data)}
              </pre>
            </Link>
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
