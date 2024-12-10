"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createCricketDataSchema } from "@/lib/validation";
import { addCricketData } from "@/lib/db/cricketData";


// This form is using the ShadCn Form Component which uses React Hook Form under the hood
// https://ui.shadcn.com/docs/components/form
// Data is done through Zod which can be used to validate on both the Frontend and Backend
// https://zod.dev/ 

export default function AddCricketDataForm() {
  const form = useForm<z.infer<typeof createCricketDataSchema>>({
    resolver: zodResolver(createCricketDataSchema),
  });

  async function onSubmit(values: z.infer<typeof createCricketDataSchema>) {
    await addCricketData(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="m-auto flex w-full max-w-xl flex-col items-center justify-center gap-3 rounded-lg border-2 bg-slate-50 p-8"
      >
        <h1 className="text-4xl font-extrabold tracking-tight text-black lg:text-5xl">
          Cricket Feed
        </h1>
        <FormField
          control={form.control}
          name="cost"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Cost of feed</FormLabel>
              <FormControl>
                <Input placeholder="Enter the cost of feed" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Name of feed (i.e. brand, leftovers...)</FormLabel>
              <FormControl>
                <Input placeholder="Enter the type or name of feed" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Amount of feed in (kg)</FormLabel>
              <FormControl>
                <Input placeholder="Enter an amount" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
