import { z } from "zod";

export const schema = z.object({
  system: z.string().optional(),
  icon: z.string().optional(),
});

export type UpdateSystemData = z.infer<typeof schema>;
