import { z } from "zod"

export const schema = z.object({
    name: z.string(),
    city: z.string(),
    status: z.string(),
    owner: z.string(),
    cnpj: z.string(),
})

export type CreateStore = z.infer<typeof schema>