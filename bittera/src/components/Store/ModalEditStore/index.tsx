import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import { UpdateStoreData, schema } from "./validations";
import { Store } from "../../../pages/dashboard";
import { api } from "../../../services/api";
import { Modal } from "../../Modal";
import {
  Button,
  ErrorMessage,
  FormContainer,
  Input,
  Label,
} from "../../Tickets/ModalEditTicket/styles";
import { ContainerButton, Select } from "../CreateStore/styles";

interface ModalEditStoreProps {
  toggleStoreEdit: () => void;
  setStores: Dispatch<SetStateAction<Store[]>>;
  storeId: string;
}

export const ModalEditStore: React.FC<ModalEditStoreProps> = ({
  toggleStoreEdit,
  setStores,
  storeId,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateStoreData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const fetchExistingData = async () => {
      try {
        const token = localStorage.getItem("tickets:token");
        const response = await api.get(`/store/${storeId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { data } = response;
        Object.keys(data).forEach((key) => {
          if (key in schema.shape) {
            setValue(key as keyof UpdateStoreData, data[key]);
          }
        });
      } catch (error) {
        console.error("Error fetching existing data:", error);
        handleError(error);
      }
    };

    fetchExistingData();
  }, [storeId, setValue]);

  const updateStore = async (data: UpdateStoreData) => {
    const token = localStorage.getItem("tickets:token");

    try {
      const response = await api.patch(`/store/${storeId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setStores((stores) =>
          stores.map((store) =>
            store.id === storeId ? { ...store, ...response.data } : store
          )
        );

        toast.success("Loja atualizada com sucesso");
        toggleStoreEdit();
      } else {
        handleError(response);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      toast.error("Erro ao atualizar a loja: " + error.message);
    } else if (error && typeof error === "object" && "response" in error) {
      const err = error as { response: { status: number; data: string } };
      if (err.response.status === 409) {
        toast.error("Erro ao atualizar a loja: Conflito. A loja já existe.");
      } else if (err.response.status === 403) {
        toast.error("Erro ao atualizar a loja: Acesso proibido.");
      } else {
        toast.error("Erro ao atualizar a loja: " + err.response.data);
      }
    } else {
      toast.error("Ocorreu um erro desconhecido.");
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      toast.error("Erro ao atualizar a loja. Por favor, verifique os campos.");
    }
  }, [errors]);

  return (
    <Modal toggleModal={toggleStoreEdit}>
      <FormContainer onSubmit={handleSubmit(updateStore)}>
        <div>
          <Label htmlFor="name">Nome</Label>
          <Input
            type="text"
            id="name"
            {...register("name")}
            placeholder="Insira o nome da loja"
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>

        <div>
          <Label htmlFor="city">Cidade</Label>
          <Input
            type="text"
            id="city"
            {...register("city")}
            placeholder="Insira a Cidade"
          />
          {errors.city && <ErrorMessage>{errors.city.message}</ErrorMessage>}
        </div>

        <div>
          <Label htmlFor="status">Status</Label>
          <Select id="status" {...register("status")}>
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
            <option value="Em manutencao">Em manutencao</option>
          </Select>
          {errors.status && (
            <ErrorMessage>{errors.status.message}</ErrorMessage>
          )}
        </div>

        <div>
          <Label htmlFor="owner">Gerente</Label>
          <Input
            type="text"
            id="owner"
            {...register("owner")}
            placeholder="Insira o gerente"
          />
          {errors.owner && <ErrorMessage>{errors.owner.message}</ErrorMessage>}
        </div>

        <div>
          <Label htmlFor="cnpj">CNPJ</Label>
          <Input
            type="text"
            id="cnpj"
            {...register("cnpj")}
            placeholder="Insira o CNPJ"
          />
          {errors.cnpj && <ErrorMessage>{errors.cnpj.message}</ErrorMessage>}
        </div>
        <div>
          <Label htmlFor="sistema">Sistema</Label>
          <Input
            type="text"
            id="sistema"
            {...register("system")}
            placeholder="Insira o id sistema"
          />
          {errors.system && (
            <ErrorMessage>{errors.system.message}</ErrorMessage>
          )}
        </div>
        <ContainerButton>
          <Button type="submit">Criar Loja</Button>
        </ContainerButton>
      </FormContainer>
    </Modal>
  );
};
