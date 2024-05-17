import { api } from "../../services/api";
import { jwtDecode } from 'jwt-decode';

export interface User {
    id: string;
    email: string;
    password: string;
}

export const AuthService = {
    getToken: (): string | null => localStorage.getItem("tickets:token"),

    getUserInfo: async (): Promise<User | null> => {
        const token = AuthService.getToken();

        if (!token) {
            return null;
        }

        const decodedToken = jwtDecode(token);
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

    logout: (): void => {
        localStorage.removeItem("tickets:token");
    },
};

