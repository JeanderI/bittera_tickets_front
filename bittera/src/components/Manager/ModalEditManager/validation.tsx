import { z } from "zod";

export const schema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  storeId: z.string().optional(),
});

export type UpdateManagerData = z.infer<typeof schema>;
