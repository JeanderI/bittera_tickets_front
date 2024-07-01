import { z } from "zod";

export const schema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  date: z.string().optional(),
  end_date: z.string().optional(),
  type: z.string().optional(),
  support: z.string().optional(),
});

export type UpdateTicketData = z.infer<typeof schema>;
