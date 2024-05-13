import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { RegisterData, schema } from "./validator";
import { api } from "../../services/api";

export const Register = () => {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterData>({
		resolver: zodResolver(schema),
	});

	const handleRegister = async (data: RegisterData) => {
		/* const chaveEsperada = "feoKll23";
		if (data.accessKey !== chaveEsperada) {
			toast.error("Chave de acesso incorreta. Registro não permitido.");
			return;
		} */
		try {
			const response = await api.post("/user", data);
			if (response.status === 201) {
				toast.success("Registro realizado com sucesso");
				navigate("");
			} else {
				if (response.status === 409) {
					toast.error("Erro ao registrar usuário: Conflito. Usuário já existe.");
				} else if (response.status === 403) {
					toast.error("Erro ao registrar usuário: Acesso proibido.");
				} else {
					toast.error("Erro ao registrar usuário: " + response.data);
				}
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				toast.error("Erro ao registrar usuário: " + error.message);
			} else {
				toast.error("Erro ao registrar usuário: " + error);
			}
		}
	};
	return (
		<div>
			

			<div>
				<div>
					<h1>Registro</h1>
					<div onSubmit={handleSubmit(handleRegister)}>
						<div>
							<label htmlFor="name">Nome</label>
							<input
								type="text"
								id="name"
								{...register("name")}
								placeholder="Insira seu nome"
							/>
							{errors.name && <span>{errors.name.message}</span>}
						</div>
						<div>
							<label htmlFor="email">Email</label>
							<input
								type="email"
								id="email"
								{...register("email")}
								placeholder="Insira seu nome de usuário"
							/>
							{errors.email && (
								<span>{errors.email.message}</span>
							)}
						</div>
						<div>
							<label htmlFor="password">Senha</label>
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
						{/* <div>
							<span htmlFor="accessKey">Chave de Acesso</span>
							<input
								type="text"
								id="accessKey"
								{...register("accessKey")}
								placeholder="Insira a chave de acesso"
							/>
							{errors.accessKey && (
								<span>{errors.accessKey.message}</span>
							)}
						</div> */}
						<button type="submit">Registrar</button>
						<Link to={"/"}>
							<span>Já possui uma conta? Faça login</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};