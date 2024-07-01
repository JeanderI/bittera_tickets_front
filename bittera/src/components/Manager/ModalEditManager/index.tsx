import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import { Manager } from "../../../pages/manager";
import { UpdateManagerData, schema } from "./validation.tsx";
import { AuthService } from "../../../contexts/UserContext";
import { api } from "../../../services/api";
import { Modal } from "../../Modal";
import {
  Button,
  ErrorMessage,
  FormContainer,
  Input,
  Label,
} from "../../Tickets/ModalEditTicket/styles";
import { ContainerButton } from "../../Section/styles";

interface ModalEditManagerProps {
  toggleManagerEdit: () => void;
  setManagers: Dispatch<SetStateAction<Manager[]>>;
  managerId: string;
}

export const ModalEditManager: React.FC<ModalEditManagerProps> = ({
  toggleManagerEdit,
  setManagers,
  managerId,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateManagerData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const fetchExistingData = async () => {
      try {
        const token = AuthService.getToken();
        const response = await api.get(`/manager/${managerId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { data } = response;
        Object.keys(data).forEach((key) => {
          if (key in schema.shape) {
            setValue(key as keyof UpdateManagerData, data[key]);
          }
        });
      } catch (error) {
        console.error("Error fetching existing data:", error);
        handleError(error);
      }
    };

    fetchExistingData();
  }, [managerId, setValue]);

  const updateManager = async (data: UpdateManagerData) => {
    const token = AuthService.getToken();

    try {
      const response = await api.patch(`/manager/${managerId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setManagers((managers) =>
          managers.map((manager) =>
            manager.id === managerId
              ? { ...manager, ...response.data }
              : manager
          )
        );

        toast.success("Gerente atualizado com sucesso");
        toggleManagerEdit();
      } else {
        handleError(response);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      toast.error("Erro ao atualizar o gerente: " + error.message);
    } else if (error && typeof error === "object" && "response" in error) {
      const err = error as { response: { status: number; data: string } };
      if (err.response.status === 409) {
        toast.error(
          "Erro ao atualizar o gerente: Conflito. O gerente já existe."
        );
      } else if (err.response.status === 403) {
        toast.error("Erro ao atualizar o gerente: Acesso proibido.");
      } else {
        toast.error("Erro ao atualizar o gerente: " + err.response.data);
      }
    } else {
      toast.error("Ocorreu um erro desconhecido.");
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      toast.error(
        "Erro ao atualizar o gerente. Por favor, verifique os campos."
      );
    }
  }, [errors]);

  return (
    <Modal toggleModal={toggleManagerEdit}>
      <FormContainer onSubmit={handleSubmit(updateManager)}>
        <div>
          <Label htmlFor="name">Nome</Label>
          <Input
            type="text"
            id="name"
            {...register("name")}
            placeholder="Digite o Nome"
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>

        <div>
          <Label htmlFor="phone">Telefone</Label>
          <Input
            type="text"
            id="phone"
            {...register("phone")}
            placeholder="Digite a Telefone"
          />
          {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
        </div>
        <ContainerButton>
          <Button type="submit">Atualizar</Button>
        </ContainerButton>
      </FormContainer>
    </Modal>
  );
};
