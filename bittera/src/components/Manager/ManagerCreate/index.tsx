import { toast } from "react-toastify";
import { api } from "../../../services/api";
import { useForm } from "react-hook-form";
import { schema } from "./validation.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react"; 
import { Modal } from "../../Modal";
import { Manager } from "../../../pages/manager";
import { CreateManager } from "./validation.tsx";

interface ModalAddManagerProps {
    toggleManagerModal: () => void;
    setManagers: React.Dispatch<React.SetStateAction<Manager[]>>;
}

export const ModalAddManager = ({
    toggleManagerModal,
    setManagers,
}: ModalAddManagerProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateManager>({
        resolver: zodResolver(schema),
    });

    const createManager = async (data: CreateManager) => {
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

            const response = await api.post("/manager", data, config);

            if (response.status === 201) {
                setManagers((previousManagers) => [response.data, ...previousManagers]);
                toggleManagerModal();
                toast.success("Gerente criado com sucesso");
            } else {
                if (response.status === 409) {
                    toast.error("Erro ao registrar gerente: Conflito. Gerente já existe.");
                } else if (response.status === 403) {
                    toast.error("Erro ao registrar gerente: Acesso proibido.");
                } else {
                    toast.error("Erro ao registrar gerente: " + response.data);
                }
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error("Erro ao registrar gerente: " + error.message);
            } else {
                toast.error("Erro ao registrar gerente: " + error);
            }
        }
    };

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            toast.error("Erro ao criar gerente. Por favor, verifique os campos.");
        }
    }, [errors]);

    return (
        <Modal toggleModal={toggleManagerModal}>
            <form onSubmit={handleSubmit(createManager)}>
                <div>
                    <label htmlFor="name">Nome</label>
                    <input
                        type="text"
                        id="name"
                        {...register("name")}
                        placeholder="Insira o nome"
                    />
                    {errors.name && <span>{errors.name.message}</span>}
                </div>

                <div>
                    <label htmlFor="phone">Telefone</label>
                    <input
                        type="text"
                        id="phone"
                        {...register("phone")}
                        placeholder="Insira o telefone"
                    />
                    {errors.phone && <span>{errors.phone.message}</span>}
                </div>
                
                <button type="submit">Criar Gerente</button>
            </form>
        </Modal>
    );
};
