import { z } from "zod";

export const schema = z.object({
	title: z
		.string()
		.min(3, { message: "O título deve ter pelo menos 3 caracteres" }),
	description: z
		.string()
		.min(5, { message: "A descrição deve ter pelo menos 5 caracteres" }),
	date: z.string(),
	end_date: z.string(),
	type: z.boolean(),
	support: z.string()
});

export type UpdateTicketData = z.infer<typeof schema>;