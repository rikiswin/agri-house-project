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
import { createCricketFarmSchema } from "@/lib/validation";
import { addCricketFarm } from "@/lib/db/cricketData";
import FormSubmitButton from "../FormSubmitButton";
import { toast } from "react-toastify";

// This form is using the ShadCn Form Component which uses React Hook Form under the hood
// https://ui.shadcn.com/docs/components/form
// Data validation is done through Zod which can be used to validate on both the Frontend and Backend
// https://zod.dev/

export default function AddCricketFarmForm() {
  const form = useForm<z.infer<typeof createCricketFarmSchema>>({
    resolver: zodResolver(createCricketFarmSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: z.infer<typeof createCricketFarmSchema>) {
    await addCricketFarm(values);
    toast.success("Successfully Added!");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="m-auto mt-3 flex w-full max-w-xl flex-col items-center justify-center gap-3 rounded-lg border-2 bg-slate-50 p-8"
      >
        <h1 className="text-xl font-extrabold tracking-tight text-black md:text-3xl lg:text-4xl">
          Add Cricket Farm
        </h1>
        <div>
          <p className="text-lg font-bold tracking-tight text-black">
            Cambodia Latitude & Longitude
          </p>
          <p className="text-lg tracking-tight text-black">Latitude: 12.5657</p>
          <p className="text-lg tracking-tight text-black">
            Longitude: 104.9910
          </p>
        </div>
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Farm Location</FormLabel>
              <FormControl>
                <Input placeholder="Enter the farm location" {...field} />
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
