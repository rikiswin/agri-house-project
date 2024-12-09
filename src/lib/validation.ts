import { z } from "zod";

const requiredString = z.string().min(1, "Required")
const requiredNumbericString = z.string().min(1, "Required").regex(/^(0|[1-9]\d*(\.\d{1})?|0\.\d{1})$/, "Must be a number")

export const createCricketDataSchema = z.object({
    cost: requiredNumbericString,
    type: requiredString,
    amount: requiredNumbericString
})

export type CreateCricketDataSchema = z.infer<typeof createCricketDataSchema>