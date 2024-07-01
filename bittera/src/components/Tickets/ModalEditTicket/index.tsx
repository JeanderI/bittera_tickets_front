import React, { useEffect } from "react";
import { Dispatch, SetStateAction } from "react";
import { Modal } from "../../Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "../../../services/api";
import { UpdateTicketData, schema } from "./validation";
import { toast } from "react-toastify";
import { AuthService } from "../../../contexts/UserContext";
import { Ticket } from "../../../pages/dashboard";
import { Button, ErrorMessage, FormContainer, Input, Label } from "./styles";
import { ContainerButton } from "../../Section/styles";
import { Select } from "../../Store/CreateStore/styles";

interface ModalEditTicketProps {
  toggleTicketEdit: () => void;
  setTickets: Dispatch<SetStateAction<Ticket[]>>;
  ticketId: string;
}

export const ModalEditTicket: React.FC<ModalEditTicketProps> = ({
  toggleTicketEdit,
  setTickets,
  ticketId,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateTicketData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const fetchExistingData = async () => {
      try {
        const token = AuthService.getToken();
        const response = await api.get(`/ticket/${ticketId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { data } = response;
        Object.keys(data).forEach((key) => {
          if (key in schema.shape) {
            setValue(key as keyof UpdateTicketData, data[key]);
          }
        });
      } catch (error) {
        console.error("Error fetching existing data:", error);
        handleError(error);
      }
    };

    fetchExistingData();
  }, [ticketId, setValue]);

  const updateTicket = async (data: UpdateTicketData) => {
    const token = AuthService.getToken();

    try {
      const response = await api.patch(`/ticket/${ticketId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setTickets((tickets) =>
          tickets.map((ticket) =>
            ticket.id === ticketId ? { ...ticket, ...response.data } : ticket
          )
        );

        toast.success("Ticket atualizado com sucesso");
        toggleTicketEdit();
      } else {
        handleError(response);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      toast.error("Erro ao atualizar o ticket: " + error.message);
    } else if (error && typeof error === "object" && "response" in error) {
      const err = error as { response: { status: number; data: string } };
      if (err.response.status === 409) {
        toast.error(
          "Erro ao atualizar o ticket: Conflito. O ticket já existe."
        );
      } else if (err.response.status === 403) {
        toast.error("Erro ao atualizar o ticket: Acesso proibido.");
      } else {
        toast.error("Erro ao atualizar o ticket: " + err.response.data);
      }
    } else {
      toast.error("Ocorreu um erro desconhecido.");
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      toast.error(
        "Erro ao atualizar o ticket. Por favor, verifique os campos."
      );
    }
  }, [errors]);

  return (
    <Modal toggleModal={toggleTicketEdit}>
      <FormContainer onSubmit={handleSubmit(updateTicket)}>
        <div>
          <Label htmlFor="title">Título</Label>
          <Input
            type="text"
            id="title"
            {...register("title")}
            placeholder="Digite o título"
          />
          {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
        </div>

        <div>
          <Label htmlFor="description">Descrição</Label>
          <Input
            type="text"
            id="description"
            {...register("description")}
            placeholder="Digite a descrição"
          />
          {errors.description && (
            <ErrorMessage>{errors.description.message}</ErrorMessage>
          )}
        </div>

        <div>
          <Label htmlFor="date">Data</Label>
          <Input
            type="text"
            id="date"
            {...register("date")}
            placeholder="Digite a data"
          />
          {errors.date && <ErrorMessage>{errors.date.message}</ErrorMessage>}
        </div>

        <div>
          <Label htmlFor="end_date">Data de Término</Label>
          <Input
            type="text"
            id="end_date"
            {...register("end_date")}
            placeholder="Digite a data de término"
          />
          {errors.end_date && (
            <ErrorMessage>{errors.end_date.message}</ErrorMessage>
          )}
        </div>

        <div>
          <Label htmlFor="type">Tipo</Label>
          <Select id="type" {...register("type")}>
            <option value="Desempenho">Desempenho</option>
            <option value="Estoque">Estoque</option>
            <option value="Financeiro">Financeiro</option>
            <option value="Integração">Integração</option>
            <option value="Relatórios">Relatórios</option>
            <option value="Segurança">Segurança</option>
            <option value="Suporte">Suporte</option>
            <option value="treinamento">treinamento</option>
            <option value="Usabilidade">Usabilidade</option>
            <option value="outros">outros</option>
          </Select>
          {errors.type && <ErrorMessage>{errors.type.message}</ErrorMessage>}
        </div>

        <div>
          <Label htmlFor="support">Suporte</Label>
          <Input
            type="text"
            id="support"
            {...register("support")}
            placeholder="Digite o suporte"
          />
          {errors.support && (
            <ErrorMessage>{errors.support.message}</ErrorMessage>
          )}
        </div>

        <ContainerButton>
          <Button type="submit">Atualizar</Button>
        </ContainerButton>
      </FormContainer>
    </Modal>
  );
};

export default ModalEditTicket;
