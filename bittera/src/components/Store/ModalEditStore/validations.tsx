import { z } from "zod";

export const schema = z.object({
  name: z.string().optional(),
  city: z.string().optional(),
  status: z.string().optional(),
  owner: z.string().optional(),
  cnpj: z.string().optional(),
  system: z.string().optional(),
});

export type UpdateStoreData = z.infer<typeof schema>;
