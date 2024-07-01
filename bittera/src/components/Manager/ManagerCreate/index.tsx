import { toast } from "react-toastify";
import { api } from "../../../services/api.ts";
import { useForm } from "react-hook-form";
import { schema } from "./validation.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Modal } from "../../Modal/index.tsx";
import { Manager } from "../../../pages/manager/index.tsx";
import { CreateManager } from "./validation.tsx";
import {
  Button,
  FormContainer,
  Input,
  Label,
} from "../../Tickets/ModalEditTicket/styles.tsx";
import { ContainerButton, Select } from "../../Store/CreateStore/styles.tsx";

interface ModalAddManagerProps {
  toggleManagerModal: () => void;
  setManagers: React.Dispatch<React.SetStateAction<Manager[]>>;
}

interface Store {
  id: string;
  name: string;
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

  const [stores, setStores] = useState<Store[]>([]);

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
      console.log(data);
      const response = await api.post(`/manager/${data.storeId}`, data, config);

      if (response.status === 201) {
        setManagers((previousManagers) => [response.data, ...previousManagers]);
        toggleManagerModal();
        toast.success("Gerente criado com sucesso");
      } else {
        if (response.status === 409) {
          toast.error(
            "Erro ao registrar gerente: Conflito. Gerente já existe."
          );
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

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await api.get("/store");
        setStores(response.data);
      } catch (error: unknown) {
        toast.error("Erro ao buscar lojas: " + error);
      }
    };

    fetchStores();
  }, []);

  return (
    <Modal toggleModal={toggleManagerModal}>
      <FormContainer onSubmit={handleSubmit(createManager)}>
        <div>
          <Label htmlFor="name">Nome</Label>
          <Input
            type="text"
            id="name"
            {...register("name")}
            placeholder="Insira o nome"
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>

        <div>
          <Label htmlFor="phone">Telefone</Label>
          <Input
            type="text"
            id="phone"
            {...register("phone")}
            placeholder="Insira o telefone"
          />
          {errors.phone && <span>{errors.phone.message}</span>}
        </div>

        <div>
          <Label htmlFor="store">Loja</Label>
          <Select id="store" {...register("storeId")}>
            <option value="">Selecione uma loja</option>
            {stores.map((store) => (
              <option key={store.id} value={store.id}>
                {store.name}
              </option>
            ))}
          </Select>
          {errors.storeId && <span>{errors.storeId.message}</span>}
        </div>

        <ContainerButton>
          <Button type="submit">Novo gerente</Button>
        </ContainerButton>
      </FormContainer>
    </Modal>
  );
};
