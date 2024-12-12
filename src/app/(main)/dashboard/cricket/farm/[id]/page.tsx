import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AddCricketDataFeedForm from "@/components/Forms/AddCricketDataFeedForm";
import { getCricketFarmData } from "@/lib/db/cricketData";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import AddBreedingPenForm from "@/components/Forms/AddBreedingPenForm";
import EditCricketFarmSheet from "@/components/Sheets/EditCricketFarmSheet";
import { Metadata } from "next";
import DeleteCricketFarmForm from "@/components/Forms/DeleteCricketFarmForm";

export const metadata: Metadata = {
  title: "Cricket Farms",
};

interface CricketFarmProps {
  params: { id: string };
}

export default async function CricketFarmPage({
  params: { id },
}: CricketFarmProps) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const cricketFarm = await getCricketFarmData(id);

  return (
    <div className="flex min-h-screen flex-col px-2 pb-6 pt-28">
      <div className="flex justify-center gap-3">
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
        <EditCricketFarmSheet
          cricketFarmId={id}
          cricketFarmValues={cricketFarm}
        />
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
      {/* TODO: Add all the graphs and tables here. Maybe connect this form to a button trigger for a better UI/UX? */}
      {/* NOTE: You can access cricket feed data for use in the graphs and tables via something like:
      cricketFarm?.BreedingPen.map((pen) => pen.CricketFeedData */}
      <AddCricketDataFeedForm breedingPens={cricketFarm?.BreedingPen} />
    </div>
  );
}
