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
import { addCricketFeedData } from "@/lib/db/cricketData";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import FormSubmitButton from "../FormSubmitButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BreedingPen } from "@prisma/client";

// This form is using the ShadCn Form Component which uses React Hook Form under the hood
// https://ui.shadcn.com/docs/components/form
// Data validation is done through Zod which can be used to validate on both the Frontend and Backend
// https://zod.dev/

interface AddCricketDataFeedFormProps {
  breedingPens: BreedingPen[] | undefined;
}

export default function AddCricketDataFeedForm({
  breedingPens,
}: AddCricketDataFeedFormProps) {
  const form = useForm<z.infer<typeof createCricketDataSchema>>({
    resolver: zodResolver(createCricketDataSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: z.infer<typeof createCricketDataSchema>) {

    // await addCricketFeedData(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="m-auto flex w-full max-w-xl flex-col items-center justify-center gap-3 rounded-lg border-2 bg-slate-50 p-8"
      >
        <h1 className="text-xl font-extrabold tracking-tight text-black lg:text-4xl">
          Add Cricket Feed Data
        </h1>
        <FormField
          control={form.control}
          name="breedingPenId"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Breeding Pen Code</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger
                      disabled={!breedingPens || breedingPens.length < 1}
                    >
                      <SelectValue
                        placeholder={
                          breedingPens && breedingPens.length > 0
                            ? "Select a breeding pen"
                            : "No breeding pen exists. Please create a breeding pen"
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {breedingPens &&
                      breedingPens.length > 0 &&
                      breedingPens.map((breedingPen) => (
                        <SelectItem key={breedingPen.id} value={breedingPen.id}>
                          {breedingPen.breedingPenCode}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="productionCycle"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Production Cycle</FormLabel>
              <FormControl>
                <Input placeholder="Enter the production cycle" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="feedSource"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Feed Source</FormLabel>
              <FormControl>
                <Input placeholder="Enter the feed source" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="feedAmountUsed"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Feed Amount Used</FormLabel>
              <FormControl>
                <Input placeholder="Enter the feed amount used" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="feedConsumption"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Feed Consumption</FormLabel>
              <FormControl>
                <Input placeholder="Enter the feed consumption" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cricketYield"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Cricket Yield</FormLabel>
              <FormControl>
                <Input placeholder="Enter the cricket yield" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cycleAge"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Cycle Age</FormLabel>
              <FormControl>
                <Input placeholder="Enter the cycle age" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cycleStatus"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Cycle Status</FormLabel>
              <FormControl>
                <Input placeholder="Enter the cycle status" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Comment</FormLabel>
              <FormControl>
                <Input placeholder="Enter a comment" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="harvestStartDate"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel>Harvest Start Date</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick harvest start date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    {...field}
                    className="w-auto p-0"
                    align="start"
                  >
                    <Calendar
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={field.onChange}
                      mode="single"
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="harvestEndDate"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel>Harvest End Date</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick harvest end date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    {...field}
                    className="w-auto p-0"
                    align="start"
                  >
                    <Calendar
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={field.onChange}
                      mode="single"
                    />
                  </PopoverContent>
                </Popover>
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
