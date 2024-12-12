import { z } from "zod";

// Convenience values
const requiredString = z.string().min(1, "Required")
const requiredNumbericString = z.string().min(1, "Required").regex(/^(0|[1-9]\d*(\.\d{1})?|0\.\d{1})$/, "Must be a number")


// Cricket Feed Data Validation
export const createCricketFeedDataSchema = z.object({
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
export type CreateCricketFeedDataSchema = z.infer<typeof createCricketFeedDataSchema>


// Cricket Farm Validation
export const createCricketFarmSchema = z.object({
    location: requiredString,
    latitude: z.coerce.number().min(-90).max(90),
    longitude: z.coerce.number().min(-180).max(180),
})
export type CreateCricketFarmSchema = z.infer<typeof createCricketFarmSchema>

export const updateCricketFarmSchema = createCricketFarmSchema.extend({
    id: z.string().min(1)
})
export type UpdateCricketFarmSchema = z.infer<typeof updateCricketFarmSchema>


// Breeding Pen Validation
export const createBreedingPenSchema = z.object({
    breedingPenCode: requiredString,
    cricketType: requiredString,
    cricketFarmId: requiredString
})
export type CreateBreedingPenSchema = z.infer<typeof createBreedingPenSchema>
