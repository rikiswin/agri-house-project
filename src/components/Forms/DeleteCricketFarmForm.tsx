"use client";
import React from "react";
import { Button } from "../ui/button";
import { deleteCricketFarm } from "@/lib/db/cricketData";
import { toast } from "react-toastify";

interface DeleteCricketFarmFormProps {
  cricketFarmId: string;
}

export default function DeleteCricketFarmForm({
  cricketFarmId,
}: DeleteCricketFarmFormProps) {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("cricketFarmId", cricketFarmId);

    console.log(formData);
    await deleteCricketFarm(formData);
    toast.success("Successfully Deleted!")
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="m-auto mt-3 flex w-full max-w-xl flex-col items-center justify-center gap-3 rounded-lg border-2 bg-slate-50 p-8"
    >
      <h1 className="text-xl font-extrabold tracking-tight text-black md:text-3xl lg:text-4xl">
        Delete Cricket Farm
      </h1>

      <p className="text-center">Permanently delete this cricket farm?</p>

      <Button className="w-full" type="submit">
        Submit
      </Button>
    </form>
  );
}
