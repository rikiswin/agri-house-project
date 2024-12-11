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
import { createBreedingPenDataSChema } from "@/lib/validation";
import { addBreedingPenWithFarmId, addCricketFarm } from "@/lib/db/cricketData";
import { useRouter } from "next/navigation";
import FormSubmitButton from "../FormSubmitButton";

// This form is using the ShadCn Form Component which uses React Hook Form under the hood
// https://ui.shadcn.com/docs/components/form
// Data validation is done through Zod which can be used to validate on both the Frontend and Backend
// https://zod.dev/

interface AddBreedingPenFormProps {
  cricketFarmId: string;
}

export default function AddBreedingPenForm({
  cricketFarmId,
}: AddBreedingPenFormProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof createBreedingPenDataSChema>>({
    resolver: zodResolver(createBreedingPenDataSChema),
    defaultValues: { cricketFarmId: cricketFarmId },
  });

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: z.infer<typeof createBreedingPenDataSChema>) {

    await addBreedingPenWithFarmId(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="m-auto flex w-full max-w-xl flex-col items-center justify-center gap-3 rounded-lg border-2 bg-slate-50 p-8"
      >
        <h1 className="text-3xl font-extrabold tracking-tight text-black lg:text-4xl">
          Add Breeding Pen
        </h1>
        <FormField
          control={form.control}
          name="breedingPenCode"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Breeding Pen Code</FormLabel>
              <FormControl>
                <Input placeholder="Enter breeding pen code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cricketType"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Cricket Type</FormLabel>
              <FormControl>
                <Input placeholder="Enter the cricket type" {...field} />
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
