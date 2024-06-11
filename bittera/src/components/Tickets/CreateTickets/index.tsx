import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import { Store, Ticket } from "../../../pages/dashboard";
import { Create } from "./validation";
import { Modal } from "../../Modal";
import { ContainerButton, FormGroup, Input, Label, Select, SubmitButton } from "../../Store/CreateStore/style";


interface ModalAddTicketProps {
  toggleTicketModal: () => void;
  setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>;
}

export const ModalAddTicket = ({
  toggleTicketModal,
  setTickets,
}: ModalAddTicketProps) => {
  const [stores, setStores] = useState<Store[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch, 
  } = useForm<Create>();

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const token = localStorage.getItem("tickets:token");

        if (!token) {
          toast.error("Token não encontrado no localStorage");
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer${token}`,
          },
        };

        const response = await api.get("/store", config);
        setStores(response.data);
      } catch (error) {
        console.error("Erro ao buscar lojas:", error);
        toast.error("Erro ao buscar lojas");
      }
    };

    fetchStores();
  }, []);

  const createTicket = async (data: Create) => {
    try {
      const token = localStorage.getItem("tickets:token");
      console.log(token);
      if (!token) {
        toast.error("Token não encontrado no localStorage");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      const storeId = watch("storeId");

      const url = `/ticket/${storeId}`;
      console.log(storeId);
      const response = await api.post(url, data, config);

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

  return (
    <Modal toggleModal={toggleTicketModal}>
      <form onSubmit={handleSubmit(createTicket)}>
        <FormGroup>
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
        </FormGroup>

        <FormGroup>
          <Label htmlFor="title">Título</Label>
          <Input
            type="text"
            id="title"
            {...register("title", { required: "Título é obrigatório" })}
            placeholder="Insira o título"
          />
          {errors.title && <span>{errors.title.message}</span>}
        </FormGroup>

        <FormGroup>
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
        </FormGroup>

        <FormGroup>
          <Label htmlFor="date">Data</Label>
          <Input
            type="text"
            id="date"
            {...register("date", { required: "Data é obrigatória" })}
          />
          {errors.date && <span>{errors.date.message}</span>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="end_date">Data Final</Label>
          <Input
            type="text"
            id="end_date"
            {...register("end_date", { required: "Data final é obrigatória" })}
          />
          {errors.end_date && <span>{errors.end_date.message}</span>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="type">Tipo</Label>
          <Input
            type="text"
            id="type"
            {...register("type", { required: "Tipo é obrigatório" })}
            placeholder="Insira o tipo"
          />
          {errors.type && <span>{errors.type.message}</span>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="status">status</Label>
          <Input
            type="checkbox"
            id="status"
            {...register("status", { required: "Suporte é obrigatório" })}
            placeholder="Insira a mensagem de ajuda"
          />
          {errors.status && <span>{errors.status.message}</span>}
        </FormGroup>

        <ContainerButton>
          <SubmitButton type="submit">Criar ticket</SubmitButton>
        </ContainerButton>
      </form>
    </Modal>
  );
};
