import { z } from "zod"


export const schema = z.object({
    system: z.string(),
    icon: z.string(),

})

export type CreateSystem = z.infer<typeof schema>