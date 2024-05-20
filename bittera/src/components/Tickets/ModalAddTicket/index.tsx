import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import { Ticket } from "../../../pages/dashboard";
import { Create } from "./validation";
import { Modal } from "../../Modal";

interface Store {
  id: string;
  name: string;
}

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
    watch, // Remova o watch, pois não será mais necessário
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
      console.log("Configuração de headers:", config);
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
        <div>
          <label htmlFor="store">Loja</label>
          <select
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
          </select>

          {errors.storeId && <span>{errors.storeId.message}</span>}
        </div>

        <div>
          <label htmlFor="title">Título</label>
          <input
            type="text"
            id="title"
            {...register("title", { required: "Título é obrigatório" })}
            placeholder="Insira o título"
          />
          {errors.title && <span>{errors.title.message}</span>}
        </div>

        <div>
          <label htmlFor="description">Descrição</label>
          <input
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
          <label htmlFor="date">Data</label>
          <input
            type="text"
            id="date"
            {...register("date", { required: "Data é obrigatória" })}
          />
          {errors.date && <span>{errors.date.message}</span>}
        </div>

        <div>
          <label htmlFor="end_date">Data Final</label>
          <input
            type="text"
            id="end_date"
            {...register("end_date", { required: "Data final é obrigatória" })}
          />
          {errors.end_date && <span>{errors.end_date.message}</span>}
        </div>

        <div>
          <label htmlFor="type">Tipo</label>
          <input
            type="text"
            id="type"
            {...register("type", { required: "Tipo é obrigatório" })}
            placeholder="Insira o tipo"
          />
          {errors.type && <span>{errors.type.message}</span>}
        </div>

        <div>
          <label htmlFor="status">status</label>
          <input
            type="checkbox"
            id="status"
            {...register("status", { required: "Suporte é obrigatório" })}
            placeholder="Insira a mensagem de ajuda"
          />
          {errors.status && <span>{errors.status.message}</span>}
        </div>

        <div>
          <button type="submit">Cadastrar</button>
        </div>
      </form>
    </Modal>
  );
};
