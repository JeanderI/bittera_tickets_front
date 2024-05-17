import { Create, schema } from "./validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "../../Modal";

import { Dispatch, SetStateAction, useEffect } from "react";
import { api } from "../../../services/api";

import { toast } from "react-toastify";

import { Ticket } from "../../../pages/dashboard";

interface ModalAddTicketProps {
	toggleTicketModal: () => void;
	setTickets: Dispatch<SetStateAction<Ticket[]>>;
}

export const ModalAddTicket = ({
	toggleTicketModal,
	setTickets,
}: ModalAddTicketProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Create>({
		resolver: zodResolver(schema),
	});

	const createTicket = async (data: Create) => {
		try {
			const token = localStorage.getItem("tickets:token");

			if (!token) {
				toast.error("Token não encontrado no localStorage");
				return;
			}

			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};

			const response = await api.post("/tickets", data, config);
			setTickets((previousTickets) => [response.data, ...previousTickets]);
			toggleTicketModal();

			if (response.status === 201) {
				toast.success("Ticket criada com sucesso");
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

	useEffect(() => {
		if (Object.keys(errors).length > 0) {
			toast.error("Erro ao criar tarefa. Por favor, verifique os campos.");
		}
	}, [errors]);

	return (
		<Modal toggleModal={toggleTicketModal}>
			

			<form onSubmit={handleSubmit(createTicket)}>
				<div>
					<label htmlFor="title">Título</label>
					<input
						type="text"
						id="title"
						{...register("title")}
						placeholder="Insira o título"
					/>
					{errors.title && <span>{errors.title.message}</span>}
				</div>

				<div>
					<label htmlFor="description">Descrição</label>
					<input
						type="text"
						id="description"
						{...register("description")}
						placeholder="Insira a descrição"
					/>
					{errors.description && (
						<span>{errors.description.message}</span>
					)}
				</div>

				<div>
					<label htmlFor="date">
						data
					</label>
					<input id="date" {...register("date")} placeholder="Insira o texto" />
					{errors.date && <span>{errors.date.message}</span>}
				</div>

				<div>
					<label htmlFor="end_date">data final</label>
					<input type="text" id="end_date" {...register("end_date")} placeholder="00" />
					{errors.end_date && <span>{errors.end_date.message}</span>}
				</div>

				<div>
					<label htmlFor="type">tipo</label>
					<input type="text" id="type" {...register("type")} placeholder="00" />
					{errors.type && <span>{errors.type.message}</span>}
				</div>

				<div>
					<label htmlFor="support">suporte</label>
					<input
						type="text"
						id="support"
						{...register("support")}
						placeholder="Insira a mensagem de ajuda"
					/>
					{errors.support && <span>{errors.support.message}</span>}
				</div>

				
				<div>
					<button type="submit">Cadastrar</button>
				</div>
			</form>
		</Modal>
	);
};