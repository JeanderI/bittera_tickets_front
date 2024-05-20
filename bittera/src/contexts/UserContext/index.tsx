import { api } from "../../services/api";
import { jwtDecode, JwtPayload } from "jwt-decode";

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

    const decodedToken = jwtDecode<JwtPayload>(token);
    const userId = decodedToken?.sub;

    if (!userId) {
      throw new Error(
        "Token inválido: não foi possível extrair o ID do usuário"
      );
    }

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

  getUserId: (): string | null => {
    const token = AuthService.getToken();

    if (!token) {
      return null;
    }

    const decodedToken = jwtDecode<JwtPayload>(token);
    const userId = decodedToken?.sub;

    if (!userId) {
      throw new Error(
        "Token inválido: não foi possível extrair o ID do usuário"
      );
    }

    return userId;
  },

  logout: (): void => {
    localStorage.removeItem("tickets:token");
  },
};
