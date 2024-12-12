"use client";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Pen } from "lucide-react";
import EditCricketFarmForm from "../Forms/EditCricketFarmForm";
import { CricketFarmWithBreedingPens } from "@/lib/db/cricketData";
import { Button } from "../ui/button";

interface EditCricketFarmSheetProps {
  cricketFarmId: string;
  cricketFarmValues: CricketFarmWithBreedingPens | null;
}

export default function EditCricketFarmSheet({
  cricketFarmId,
  cricketFarmValues,
}: EditCricketFarmSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-orange-600 hover:bg-orange-500">
          Edit Farm <Pen />
        </Button>
      </SheetTrigger>
      <SheetContent onOpenAutoFocus={(e) => e.preventDefault()} side="bottom">
        <EditCricketFarmForm
          cricketFarmValues={cricketFarmValues}
          cricketFarmId={cricketFarmId}
        />
      </SheetContent>
    </Sheet>
  );
}
