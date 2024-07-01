import { toast } from "react-toastify";
import { Store } from "../../../pages/dashboard";
import { api } from "../../../services/api";
import { useForm } from "react-hook-form";
import { CreateStore, schema } from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Modal } from "../../Modal";
import { ContainerButton, Input, Label, Select } from "./styles.tsx";
import { Button, FormContainer } from "../../Tickets/ModalEditTicket/styles";

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
      console.log(data);
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
      <FormContainer onSubmit={handleSubmit(createStore)}>
        <div>
          <Label htmlFor="name">Nome</Label>
          <Input
            type="text"
            id="name"
            {...register("name")}
            placeholder="Insira o nome da loja"
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>

        <div>
          <Label htmlFor="city">Cidade</Label>
          <Input
            type="text"
            id="city"
            {...register("city")}
            placeholder="Insira a Cidade"
          />
          {errors.city && <span>{errors.city.message}</span>}
        </div>

        <div>
          <Label htmlFor="status">Status</Label>
          <Select id="status" {...register("status")}>
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
            <option value="Em manutencao">Em manutencao</option>
          </Select>
          {errors.status && <span>{errors.status.message}</span>}
        </div>

        <div>
          <Label htmlFor="owner">Gerente</Label>
          <Input
            type="text"
            id="owner"
            {...register("owner")}
            placeholder="Insira o gerente"
          />
          {errors.owner && <span>{errors.owner.message}</span>}
        </div>

        <div>
          <Label htmlFor="cnpj">CNPJ</Label>
          <Input
            type="text"
            id="cnpj"
            {...register("cnpj")}
            placeholder="Insira o CNPJ"
          />
          {errors.cnpj && <span>{errors.cnpj.message}</span>}
        </div>
        <div>
          <Label htmlFor="sistema">Sistema</Label>
          <Input
            type="text"
            id="sistema"
            {...register("system")}
            placeholder="Insira o id sistema"
          />
          {errors.system && <span>{errors.system.message}</span>}
        </div>
        <ContainerButton>
          <Button type="submit">Nova Loja</Button>
        </ContainerButton>
      </FormContainer>
    </Modal>
  );
};
