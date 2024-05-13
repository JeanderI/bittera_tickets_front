import jwt_decode from "jwt-decode";
import { api } from "../../services/api";

export interface User {
	id: string;
	username: string;
	name: string;
}

export const AuthService = {
	getToken: () => localStorage.getItem("voce-falando-ingles:token"),
	getUserInfo: async (): Promise<User | null> => {
		const token = AuthService.getToken();

		if (!token) {
			return null;
		}

		const decodedToken = jwt_decode(token) as { sub: string };
		console.log(decodedToken);
		const userId = decodedToken.sub;

		try {
			const response = await api.get(`/user/${userId}`);
			if (response.status === 200) {
				const user = response.data as User;
				return user;
			} else {
				throw new Error("Erro ao obter informações do usuário");
			}
		} catch (error) {
			console.error("Erro ao obter informações do usuário:", error);
			return null;
		}
	},
	logout: () => {
		localStorage.removeItem("voce-falando-ingles:token");
	},
};