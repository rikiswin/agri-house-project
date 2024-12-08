import { z } from "zod";

const validatedEnvSchema = z.object({
    DATABASE_URL: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    NEXTAUTH_URL: z.string(),
    NEXTAUTH_SECRET: z.string(),
})

export const env = validatedEnvSchema.parse(process.env)