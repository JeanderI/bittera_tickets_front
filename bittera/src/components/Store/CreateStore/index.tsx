import { toast } from "react-toastify";
import { Store } from "../../../pages/dashboard";
import { api } from "../../../services/api";
import { useForm } from "react-hook-form";
import { CreateStore, schema } from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react"; 
import { Modal } from "../../Modal";


interface ModalAddStoreProps {
    toggleStoreModal: () => void;
    setStores: React.Dispatch<React.SetStateAction<Store[]>>;
}

export const ModalAddStore = ({
    toggleStoreModal,
    setStores,
}: ModalAddStoreProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateStore>({
        resolver: zodResolver(schema),
    });

    const createStore = async (data: CreateStore) => {
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

            const response = await api.post("/store", data, config);

            if (response.status === 201) {
                setStores((previousStores) => [response.data, ...previousStores]);
                toggleStoreModal();
                toast.success("loja criada com sucesso");
            } else {
                if (response.status === 409) {
                    toast.error("Erro ao registrar loja: Conflito. Loja já existe.");
                } else if (response.status === 403) {
                    toast.error("Erro ao registrar loja: Acesso proibido.");
                } else {
                    toast.error("Erro ao registrar loja: " + response.data);
                }
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error("Erro ao registrar loja: " + error.message);
            } else {
                toast.error("Erro ao registrar loja: " + error);
            }
        }
    };

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            toast.error("Erro ao criar loja. Por favor, verifique os campos.");
        }
    }, [errors]);

    return (
        <Modal toggleModal={toggleStoreModal}>
            <form onSubmit={handleSubmit(createStore)}>
                <div>
					<label htmlFor="name">Nome</label>
					<input
						type="text"
						id="name"
						{...register("name")}
						placeholder="Insira o título"
					/>
					{errors.name && <span>{errors.name.message}</span>}
				</div>

                <div>
					<label htmlFor="city">Cidade</label>
					<input
						type="text"
						id="city"
						{...register("city")}
						placeholder="Insira o título"
					/>
					{errors.city && <span>{errors.city.message}</span>}
				</div>

                <div>
					<label htmlFor="status">Status</label>
					<input
						type="text"
						id="status"
						{...register("status")}
						placeholder="Insira o título"
					/>
					{errors.status && <span>{errors.status.message}</span>}
				</div>

                <div>
					<label htmlFor="owner">Gerente</label>
					<input
						type="text"
						id="owner"
						{...register("owner")}
						placeholder="Insira o título"
					/>
					{errors.owner && <span>{errors.owner.message}</span>}
				</div>

                <div>
					<label htmlFor="cnpj">CNPJ</label>
					<input
						type="text"
						id="cnpj"
						{...register("cnpj")}
						placeholder="Insira o título"
					/>
					{errors.cnpj && <span>{errors.cnpj.message}</span>}
				</div>
                <button type="submit">Criar Tarefa</button>
            </form>
        </Modal>
    );
};
