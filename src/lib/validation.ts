import { z } from "zod";

const requiredString = z.string().min(1, "Required")
const requiredNumbericString = z.string().min(1, "Required").regex(/^(0|[1-9]\d*(\.\d{1})?|0\.\d{1})$/, "Must be a number")

export const createCricketDataSchema = z.object({
    productionCycle: requiredNumbericString,
    feedSource: requiredString,
    feedAmountUsed: requiredNumbericString,
    feedConsumption: requiredNumbericString,
    harvestStartDate: z.coerce.date(),
    harvestEndDate: z.coerce.date().optional(),
    cycleStatus: requiredString,
    cycleAge: requiredNumbericString,
    cricketYield: requiredNumbericString,
    comment: z.string().optional(),
    breedingPenId: requiredString
})

export type CreateCricketDataSchema = z.infer<typeof createCricketDataSchema>

export const createCricketFarmDataSchema = z.object({
    location: requiredString,
    // NOTE: we need lat and lon values for creating markers on the mapping library
    // latitude: requiredNumbericString,
    // longitude: requiredNumbericString,
})

export type CreateCricketFarmDataSchema = z.infer<typeof createCricketFarmDataSchema>

export const createBreedingPenDataSChema = z.object({
    breedingPenCode: requiredString,
    cricketType: requiredString,
    cricketFarmId: requiredString
})

export type CreateBreedingPenDataSChema = z.infer<typeof createBreedingPenDataSChema>