import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AddCricketDataFeedForm from "@/components/Forms/AddCricketDataFeedForm";
import {
  deleteCricketFarm,
  getBreedingPenWithFarmId,
} from "@/lib/db/cricketData";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import AddBreedingPenForm from "@/components/Forms/AddBreedingPenForm";

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
  const breedingPens = await getBreedingPenWithFarmId(id);

  return (
    <div className="flex min-h-screen flex-col pb-6 pt-28">
      <div className="flex justify-center gap-3">
        <form
          action={deleteCricketFarm}
          className="flex items-center justify-center"
        >
          <input
            id="cricketFarmId"
            name="cricketFarmId"
            hidden
            readOnly
            value={id}
          />
          <Button className="mb-2 bg-destructive">
            Delete Farm <Trash2 />
          </Button>
        </form>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-500">
              Add Breeding Pen
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom">
            <AddBreedingPenForm cricketFarmId={id} />
          </SheetContent>
        </Sheet>
      </div>
      {/* TODO: Add all the graphs and tables here */}
      <AddCricketDataFeedForm breedingPens={breedingPens} />
    </div>
  );
}
