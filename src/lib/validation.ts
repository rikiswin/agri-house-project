import { z } from "zod";

const requiredString = z.string().min(1, "Required")
const requiredNumbericString = z.string().min(1, "Required").regex(/^(0|[1-9]\d*(\.\d{1})?|0\.\d{1})$/, "Must be a number")

export const createCricketDataSchema = z.object({
    breedingPenCode: requiredString,
    cricketType: requiredString,
    productionCycle: requiredNumbericString,
    feedAmountUsed: requiredNumbericString,
    feedSource: requiredString,
    harvestStartDate: z.coerce.date(),
    harvestEndDate: z.coerce.date().optional(),
    cycleStatus: requiredString,
    cycleAge: requiredNumbericString,
    feedConsumption: requiredNumbericString,
    cricketYield: requiredNumbericString,
    comment: z.string().optional(),
})

export type CreateCricketDataSchema = z.infer<typeof createCricketDataSchema>