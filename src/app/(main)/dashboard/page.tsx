import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/authOptions";
import { getCricketAllFarmData } from "@/lib/db/cricketData";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import AddCricketFarmForm from "@/components/Forms/AddCricketFarmForm";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  // if (!session) {
  //   redirect("/login");
  // }
  const Mapbox = dynamic(() => import("../../../components/Mapbox"), {
    ssr: false,
  });

  const cricketFarms = await getCricketAllFarmData();

  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative grid h-full min-h-screen w-full gap-5 border-2">
        <div className="absolute right-0 z-40 mr-4 mt-16 flex justify-end gap-3 lg:mr-12 lg:mt-24">
          <Sheet>
            <SheetTrigger asChild>
              <Button>View All</Button>
            </SheetTrigger>
            <SheetContent side="bottom">
              <div className="flex flex-col gap-3">
                <h1 className="w-fit border-b-2 border-black p-3 text-xl md:text-3xl lg:text-4xl">
                  All farms
                </h1>
                {cricketFarms && cricketFarms.length > 0 ? (
                  cricketFarms.map((farm, index) => (
                    <Link
                      key={farm.id}
                      href={`/dashboard/cricket/farm/${farm.id}`}
                      className="rounded-xl border p-5 hover:bg-slate-50"
                    >
                      <h2>Farm {index + 1}</h2>
                      <h2>{farm.location}</h2>
                    </Link>
                  ))
                ) : (
                  <p className="text-muted-foreground">
                    There are currently no cricket farms. Please add some
                    cricket farms.
                  </p>
                )}
              </div>
            </SheetContent>
          </Sheet>
          <Sheet>
            <SheetTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-500">
                Add Farm
              </Button>
            </SheetTrigger>
            <SheetContent className="" side="bottom">
              <AddCricketFarmForm />
            </SheetContent>
          </Sheet>
        </div>
        <Mapbox cricketFarms={cricketFarms} />
      </div>
    </div>
  );
}
