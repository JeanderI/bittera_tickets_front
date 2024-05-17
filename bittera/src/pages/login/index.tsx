import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginData, schema } from "./validator";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

export const Login = () => {
	const { signIn } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginData>({
		resolver: zodResolver(schema),
	});

	return (
		<div className="login-container">
			<div className="login-form">
				<h1>Login</h1>
				<form onSubmit={handleSubmit(signIn)}>
					<div className="form-group">
						<label htmlFor="email">Usuário</label>
						<input
							type="text"
							id="email"
							{...register("email")}
							placeholder="Insira seu nome de usuário"
						/>
						{errors.email && (
							<span className="error-message">{errors.email.message}</span>
						)}
					</div>
					<div className="form-group">
						<label htmlFor="password">Senha</label>
						<input
							type="password"
							id="password"
							{...register("password")}
							placeholder="Insira sua senha"
						/>
						{errors.password && (
							<span className="error-message">{errors.password.message}</span>
						)}
					</div>
					<button type="submit">Entrar</button>
					<Link to={"/register"}>
						<span className="register-link">Ainda não possui uma conta?</span>
					</Link>
				</form>
			</div>
		</div>
	);
};
