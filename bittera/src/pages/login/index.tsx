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
		<div>
	

			<div>
				<div>
					<h1>Login</h1>
					<div onSubmit={handleSubmit(signIn)}>
						<div>
							{/* <span htmlFor="email">Usuario</span> */}
							<input
								type="text"
								id="email"
								{...register("email")}
								placeholder="Insira seu nome de usuário"
							/>
							{errors.email && (
								<span>{errors.email.message}</span>
							)}
						</div>
						<div>
							{/* <span htmlFor="password">Senha</span> */}
							<input
								type="password"
								id="password"
								{...register("password")}
								placeholder="Insira sua senha"
							/>
							{errors.password && (
								<span>{errors.password.message}</span>
							)}
						</div>

						<button type="submit">Entrar</button>
						<Link to={"/register"}>
							<span>ainda não possui uma conta?</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};