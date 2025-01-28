// app/dashboard/cricket/farm/[id]/page.tsx

import { getCricketFarmData } from "@/lib/db/cricketData";
import AddCricketDataFeedForm from "@/components/Forms/AddCricketDataFeedForm";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import AddBreedingPenForm from "@/components/Forms/AddBreedingPenForm";
import EditCricketFarmSheet from "@/components/Sheets/EditCricketFarmSheet";
import { Metadata } from "next";
import DeleteCricketFarmForm from "@/components/Forms/DeleteCricketFarmForm";
import CricketFeedLineChart from "@/components/Graph/CricketFeedLineChart";
import CricketFeedTable from "@/components/Graph/CricketFeedTable";

export const metadata: Metadata = {
  title: "Cricket Farms",
};

interface CricketFarmProps {
  params: { id: string };
}

export default async function CricketFarmPage({
                                                params: { id },
                                              }: CricketFarmProps) {
  const cricketFarm = await getCricketFarmData(id);

  if (!cricketFarm) {
    return <p className="text-center text-red-500">Cricket Farm not found.</p>;
  }

  // Aggregate all cricket feed data across breeding pens
  const allCricketFeedData = cricketFarm.BreedingPen.flatMap((pen) =>
    pen.CricketFeedData.map((feed) => ({
      date: feed.harvestStartDate.toISOString().split("T")[0], // Format Date as 'YYYY-MM-DD'
      feedAmount: feed.feedAmountUsed,
      // Include other fields if necessary
    }))
  );

  // Sort the data by date
  allCricketFeedData.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="flex min-h-screen flex-col px-2 pb-6 pt-28">
      <div className="flex justify-center gap-3">
        {/* Delete Farm Sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <Button className="mb-2 bg-destructive">
              <span className="hidden md:flex">Delete Farm</span> <Trash2 />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom">
            <DeleteCricketFarmForm cricketFarmId={id} />
          </SheetContent>
        </Sheet>

        {/* Edit Farm Sheet */}
        <EditCricketFarmSheet
          cricketFarmId={id}
          cricketFarmValues={cricketFarm}
        />

        {/* Add Breeding Pen Sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-500">
              <span className="hidden md:flex">Add Breeding Pen</span> <Plus />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom">
            <AddBreedingPenForm cricketFarmId={id} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Graph Section */}
      <div className="my-6">
        <div className="m-auto mt-3 flex w-full max-w-xl flex-col items-center justify-center gap-3 rounded-lg border-2 bg-slate-50 p-8 px-4 lg:px-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Cricket Feed Over Time
          </h2>
          {allCricketFeedData.length > 0 ? (
            <CricketFeedLineChart data={allCricketFeedData} />
          ) : (
            <p className="text-center text-gray-500">
              No feed data available to display.
            </p>
          )}
        </div>
      </div>

      {/* Table Section */}
      <div className="my-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Cricket Feed Details
        </h2>
        {allCricketFeedData.length > 0 ? (
          <CricketFeedTable data={allCricketFeedData} />
        ) : (
          <p className="text-center text-gray-500">
            No feed data available to display.
          </p>
        )}
      </div>

      {/* Add Cricket Data Feed Form */}
      <AddCricketDataFeedForm breedingPens={cricketFarm.BreedingPen} />
    </div>
  );
}