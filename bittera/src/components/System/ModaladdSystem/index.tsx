import { toast } from "react-toastify";
import { api } from "../../../services/api";
import { useForm } from "react-hook-form";
import { CreateSystem, schema } from "./validation.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react"; 
import { Modal } from "../../Modal";
import { System } from "../../../pages/system/index.tsx";



interface ModalAddSystemProps {
    toggleSystemModal: () => void;
    setSystems: React.Dispatch<React.SetStateAction<System[]>>;
}

export const ModalAddSystem = ({
    toggleSystemModal,
    setSystems,
}: ModalAddSystemProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateSystem>({
        resolver: zodResolver(schema),
    });

    const createSystem = async (data: CreateSystem) => {
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

            const response = await api.post("/system", data, config);

            if (response.status === 201) {
                setSystems((previousSystems) => [response.data, ...previousSystems]);
                toggleSystemModal();
                toast.success("sistema criado com sucesso");
            } else {
                if (response.status === 409) {
                    toast.error("Erro ao registrar sistema: Conflito. sistema já existe.");
                } else if (response.status === 403) {
                    toast.error("Erro ao registrar sistema: Acesso proibido.");
                } else {
                    toast.error("Erro ao registrar sistema: " + response.data);
                }
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error("Erro ao registrar sistema: " + error.message);
            } else {
                toast.error("Erro ao registrar sistema: " + error);
            }
        }
    };

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            toast.error("Erro ao criar sistema. Por favor, verifique os campos.");
        }
    }, [errors]);

    return (
        <Modal toggleModal={toggleSystemModal}>
            <form onSubmit={handleSubmit(createSystem)}>
                <div>
                    <label htmlFor="system">Sistema</label>
                    <input
                        type="text"
                        id="system"
                        {...register("system")}
                        placeholder="Insira o nome"
                    />
                    {errors.system && <span>{errors.system.message}</span>}
                </div>

                <div>
                    <label htmlFor="icon">Imagem</label>
                    <input
                        type="text"
                        id="icon"
                        {...register("icon")}
                        placeholder="Insira o telefone"
                    />
                    {errors.icon && <span>{errors.icon.message}</span>}
                </div>
                
                <button type="submit">Criar Gerente</button>
            </form>
        </Modal>
    );
};
