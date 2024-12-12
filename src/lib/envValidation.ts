import { z } from "zod";

const validatedEnvSchema = z.object({
    DATABASE_URL: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    NEXTAUTH_URL: z.string(),
    NEXTAUTH_SECRET: z.string(),
    MONGODB_URI: z.string(),
    COLL_NAME: z.string(),
    DB_NAME: z.string(),
    NEXT_PUBLIC_MAPBOX_API_KEY: z.string()
})

export const env = validatedEnvSchema.parse(process.env)
