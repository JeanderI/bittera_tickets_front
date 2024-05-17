import { ReactNode, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api"; 
import { LoginData } from "../pages/login/validator";
import { toast } from "react-toastify";

interface AuthProviderProps {
	children: ReactNode;
}

interface AuthContextValues {
	signIn: (data: LoginData) => void;
	loading: boolean;
}

export const AuthContext = createContext<AuthContextValues>(
	{} as AuthContextValues
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem("tickets:token");

		if (!token) {
			setLoading(false);
			return;
		}

		api.defaults.headers.common.authorization = `Bearer ${token}`;
		setLoading(false);
	}, []);

	const signIn = async (data: LoginData) => {
		try {
			const response = await api.post("/login", data);

			const { token } = response.data;

			api.defaults.headers.common.authorization = `Bearer ${token}`;
			localStorage.setItem("tickets:token", token);
			if (response.status === 200) {
				toast.success("Login realizado com sucesso");

				navigate("dashboard");
			} else {
				if (response.status === 400) {
					toast.error("Erro ao entrar com o usuário");
				} else if (response.status === 403) {
					toast.error("Erro ao entrar com o usuário: Acesso proibido.");
				} else {
					toast.error("Erro ao entrar com o usuário: " + response.data);
				}
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				toast.error("Erro ao entrar com o usuário : " + error.message);
			} else {
				toast.error("Erro ao entrar com o usuário: " + error);
			}
		}
	};

	return (
		<AuthContext.Provider value={{ signIn, loading }}>
			{children}
		</AuthContext.Provider>
	);
}; 