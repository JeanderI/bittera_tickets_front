import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import { Store, Ticket } from "../../../pages/dashboard";
import { Create } from "./validation";
import { Modal } from "../../Modal";
import { Button, FormContainer, Input, Label } from "../ModalEditTicket/styles";
import { ContainerButton, Select } from "../../Store/CreateStore/styles.tsx";

interface ModalAddTicketProps {
  toggleTicketModal: () => void;
  setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>;
}

export const ModalAddTicket = ({
  toggleTicketModal,
  setTickets,
}: ModalAddTicketProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Create>();

  const [stores, setStores] = useState<Store[]>([]);
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

      const response = await api.post(`/ticket/${data.storeId}`, data, config);

      if (response.status === 201) {
        setTickets((previousTickets: Ticket[]) => [
          response.data,
          ...previousTickets,
        ]);
        toast.success("Ticket criado com sucesso");
        toggleTicketModal();
      } else {
        toast.error("Erro ao criar ticket");
      }
    } catch (error) {
      console.error("Erro ao criar ticket:", error);
      toast.error("Erro ao criar ticket");
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      toast.error("Erro ao criar ticket. Por favor, verifique os campos.");
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
    <Modal toggleModal={toggleTicketModal}>
      <FormContainer onSubmit={handleSubmit(createTicket)}>
        <div>
          <Label htmlFor="store">Loja</Label>
          <Select
            id="store"
            {...register("storeId", { required: "A loja é obrigatória" })}
            onChange={(e) =>
              setValue("storeId", e.target.value, { shouldValidate: true })
            }
          >
            <option value="">Selecione a loja</option>
            {stores.map((store) => (
              <option key={store.id} value={store.id}>
                {store.name}
              </option>
            ))}
          </Select>

          {errors.storeId && <span>{errors.storeId.message}</span>}
        </div>
        <div>
          <Label htmlFor="title">Título</Label>
          <Input
            type="text"
            id="title"
            {...register("title", { required: "Título é obrigatório" })}
            placeholder="Insira o título"
          />
          {errors.title && <span>{errors.title.message}</span>}

          <Label htmlFor="description">Descrição</Label>
          <Input
            type="text"
            id="description"
            {...register("description", {
              required: "Descrição é obrigatória",
            })}
            placeholder="Insira a descrição"
          />
          {errors.description && <span>{errors.description.message}</span>}
        </div>
        <div>
          <Label htmlFor="date">Data</Label>
          <Input
            type="text"
            id="date"
            {...register("date", { required: "Data é obrigatória" })}
          />
          {errors.date && <span>{errors.date.message}</span>}

          <Label htmlFor="date">Suporte</Label>
          <Input
            type="text"
            id="support"
            {...register("support", { required: "Data é obrigatória" })}
          />
          {errors.support && <span>{errors.support.message}</span>}
        </div>
        <div>
          <Label htmlFor="end_date">Data Final</Label>
          <Input
            type="text"
            id="end_date"
            {...register("end_date", { required: "Data final é obrigatória" })}
          />
          {errors.end_date && <span>{errors.end_date.message}</span>}

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
          {errors.type && <span>{errors.type.message}</span>}
        </div>

        <ContainerButton>
          <Button type="submit">Novo ticket</Button>
        </ContainerButton>
      </FormContainer>
    </Modal>
  );
};
