import { z } from "zod";

export const schema = z.object({
	email: z
		.string()
		.min(4, { message: "O email deve ter pelo menos 4 caracteres" }),
	password: z
		.string()
		.min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
	name: z
		.string()
		.min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
	
});

export type RegisterData = z.infer<typeof schema>;