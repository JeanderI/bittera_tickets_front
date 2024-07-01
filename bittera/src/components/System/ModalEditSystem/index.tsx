import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import { System } from "../../../pages/system";
import { UpdateSystemData, schema } from "./validations";
import { AuthService } from "../../../contexts/UserContext";
import { api } from "../../../services/api";
import { Modal } from "../../Modal";
import {
  Button,
  FormContainer,
  Input,
  Label,
} from "../../Tickets/ModalEditTicket/styles";
import { ContainerButton } from "../../Section/styles";

interface ModalEditSystemProps {
  toggleSystemEdit: () => void;
  setSystems: Dispatch<SetStateAction<System[]>>;
  systemId: string;
}

export const ModalEditSystem: React.FC<ModalEditSystemProps> = ({
  toggleSystemEdit,
  setSystems,
  systemId,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateSystemData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const fetchExistingData = async () => {
      try {
        const token = AuthService.getToken();
        const response = await api.get(`/system/${systemId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { data } = response;
        Object.keys(data).forEach((key) => {
          if (key in schema.shape) {
            setValue(key as keyof UpdateSystemData, data[key]);
          }
        });
      } catch (error) {
        console.error("Error fetching existing data:", error);
        handleError(error);
      }
    };

    fetchExistingData();
  }, [systemId, setValue]);

  const updateSystem = async (data: UpdateSystemData) => {
    const token = AuthService.getToken();

    try {
      const response = await api.patch(`/system/${systemId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setSystems((systems) =>
          systems.map((system) =>
            system.id === systemId ? { ...system, ...response.data } : system
          )
        );

        toast.success("Sistema atualizado com sucesso");
        toggleSystemEdit();
      } else {
        handleError(response);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      toast.error("Erro ao atualizar o sistema: " + error.message);
    } else if (error && typeof error === "object" && "response" in error) {
      const err = error as { response: { status: number; data: string } };
      if (err.response.status === 409) {
        toast.error(
          "Erro ao atualizar o sistema: Conflito. O sistema já existe."
        );
      } else if (err.response.status === 403) {
        toast.error("Erro ao atualizar o sistema: Acesso proibido.");
      } else {
        toast.error("Erro ao atualizar o sistema: " + err.response.data);
      }
    } else {
      toast.error("Ocorreu um erro desconhecido.");
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      toast.error(
        "Erro ao atualizar o sistema. Por favor, verifique os campos."
      );
    }
  }, [errors]);

  return (
    <Modal toggleModal={toggleSystemEdit}>
      <FormContainer onSubmit={handleSubmit(updateSystem)}>
        <div>
          <Label htmlFor="system">Nome do Sistema</Label>
          <Input
            type="text"
            id="system"
            {...register("system")}
            placeholder="Digite o nome do sistema"
          />
          {errors.system && <span>{errors.system.message}</span>}
        </div>
        <div>
          <Label htmlFor="system">icon</Label>
          <Input
            type="text"
            id="icon"
            {...register("icon")}
            placeholder="Digite o nome do sistema"
          />
          {errors.icon && <span>{errors.icon.message}</span>}
        </div>

        <ContainerButton>
          <Button type="submit">Atualizar</Button>
        </ContainerButton>
      </FormContainer>
    </Modal>
  );
};
