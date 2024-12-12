"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateCricketFarmSchema } from "@/lib/validation";
import {
  CricketFarmWithBreedingPens,
  updateCricketFarm,
} from "@/lib/db/cricketData";
import FormSubmitButton from "../FormSubmitButton";
import { toast } from "react-toastify";

// This form is using the ShadCn Form Component which uses React Hook Form under the hood
// https://ui.shadcn.com/docs/components/form
// Data validation is done through Zod which can be used to validate on both the Frontend and Backend
// https://zod.dev/

interface EditCricketFarmFormProps {
  cricketFarmId: string;
  cricketFarmValues: CricketFarmWithBreedingPens | null;
}

export default function EditCricketFarmForm({
  cricketFarmId,
  cricketFarmValues,
}: EditCricketFarmFormProps) {
  const form = useForm<z.infer<typeof updateCricketFarmSchema>>({
    resolver: zodResolver(updateCricketFarmSchema),
    defaultValues: {
      id: cricketFarmId,
      latitude: cricketFarmValues?.latitude,
      longitude: cricketFarmValues?.longitude,
      location: cricketFarmValues?.location,
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: z.infer<typeof updateCricketFarmSchema>) {
    await updateCricketFarm(values);
    toast.success("Successfully Updated!");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="m-auto mt-3 flex w-full max-w-xl flex-col items-center justify-center gap-3 rounded-lg border-2 bg-slate-50 p-8"
      >
        <h1 className="text-xl font-extrabold tracking-tight text-black md:text-3xl lg:text-4xl">
          Edit Cricket Farm
        </h1>
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Enter the location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="latitude"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Latitude</FormLabel>
              <FormControl>
                <Input placeholder="Enter the latitude" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="longitude"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Longitude</FormLabel>
              <FormControl>
                <Input placeholder="Enter the longitude" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormSubmitButton
          isLoading={isSubmitting}
          className="w-full"
          type="submit"
        >
          Submit
        </FormSubmitButton>
      </form>
    </Form>
  );
}
