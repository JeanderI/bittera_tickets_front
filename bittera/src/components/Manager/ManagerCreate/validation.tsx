import { z } from "zod"

export const schema = z.object({
    name: z.string(),
    phone: z.string(),
})

export type CreateManager = z.infer<typeof schema>