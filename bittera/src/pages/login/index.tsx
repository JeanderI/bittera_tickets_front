import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginData, schema } from "./validator";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { ButtonLogin, Container, ContainerLogin, Form, InputLogin, Left, Right } from "./styles";
import logo from "../../assets/Bittera_avatar (3).png"

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
		<Container>
			<ContainerLogin>
				<Right>
					<img src={logo} alt="" />
				</Right>
				<Left>	
					<Form onSubmit={handleSubmit(signIn)}>
						<h2>Bem vindo de volta</h2>
						<div>
							
							<InputLogin
								type="text"
								id="email"
								{...register("email")}
								placeholder="Insira seu nome de usuário"
							/>
							{errors.email && (
								<span>{errors.email.message}</span>
							)}
						</div>
						<div >
							
							<InputLogin
								type="password"
								id="password"
								{...register("password")}
								placeholder="Insira sua senha"
							/>
							{errors.password && (
								<span>{errors.password.message}</span>
							)}
						</div>
						<ButtonLogin type="submit">Entrar</ButtonLogin>
						<Link to={"/register"}>
							<span >Ainda não possui uma conta?</span>
						</Link>
					</Form>
				</Left>
				
			</ContainerLogin>
		</Container>
	);
};
