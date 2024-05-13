import { z } from "zod";

export const schema = z.object({
	email: z.string().nonempty("Usuario é obrigatório"),
	password: z.string().nonempty("Senha é obrigatória"),
});

export type LoginData = z.infer<typeof schema>;