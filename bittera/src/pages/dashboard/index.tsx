import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { TicketList } from "../../components/Tickets/TicketList";
import { ModalAddTicket } from "../../components/Tickets/CreateTickets";
import { ModalEditTicket } from "../../components/Tickets/ModalEditTicket";
import { toast } from "react-toastify";
import { AuthService } from "../../contexts/UserContext";
import { Container } from "../../components/Container/styles";
import { Header } from "../../components/Header";
import ModalViewTicket from "../../components/Tickets/ModalviewTicket";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface Store {
  id: string;
  name: string;
  city: string;
  status: string;
  owner: string;
  cnpj: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  date: string;
  end_date: string;
  type: string;
  support: string;
  user: User;
  store: Store;
  storeId?: string;
}

export const Dashboard = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [ticketItemId, setTicketItemId] = useState("");
  const [viewedTicket, setViewedTicket] = useState<Ticket | null>(null);

  const [isOpenTicketModal, setIsOpenTicketModal] = useState(false);
  const toggleTicketModal = () => setIsOpenTicketModal(!isOpenTicketModal);

  const [isOpenTicketEdit, setIsOpenTicketEdit] = useState(false);
  const toggleTicketEdit = (id: string) => {
    setIsOpenTicketEdit(true);
    setTicketItemId(id);
  };

  const closeTicketEdit = () => setIsOpenTicketEdit(false);

  const onViewTicket = (ticketId: string) => {
    const ticket = tickets.find((ticket) => ticket.id === ticketId);
    setViewedTicket(ticket || null);
  };

  const confirmDeleteTicket = (ticketId: string) => {
    if (window.confirm("Tem certeza que deseja excluir este ticket?")) {
      deleteTicket(ticketId);
    }
  };

  const deleteTicket = async (ticketId: string) => {
    const token = AuthService.getToken();

    try {
      const response = await api.delete(`/ticket/${ticketId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 204) {
        setTickets((previousTickets) =>
          previousTickets.filter((ticket) => ticket.id !== ticketId)
        );
        toast.success("Ticket deletado com sucesso");
      } else {
        toast.error("Erro ao deletar ticket");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Erro ao deletar ticket: " + error.message);
      } else {
        toast.error("Erro ao deletar ticket: " + String(error));
      }
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get("/ticket");
        setTickets(response.data);
      } catch (error) {
        console.error("Erro ao buscar tickets:", error);
      }
    })();
  }, []);

  return (
    <Container>
      <Header />

      <main>
        {isOpenTicketModal && (
          <ModalAddTicket
            toggleTicketModal={toggleTicketModal}
            setTickets={setTickets}
          />
        )}

        {isOpenTicketEdit && (
          <ModalEditTicket
            toggleTicketEdit={closeTicketEdit}
            setTickets={setTickets}
            ticketId={ticketItemId}
          />
        )}

        {viewedTicket && (
          <ModalViewTicket
            ticket={viewedTicket}
            onClose={() => setViewedTicket(null)}
            onEditTicket={toggleTicketEdit}
            onDeleteTicket={confirmDeleteTicket}
          />
        )}

        <TicketList
          toggleModal={toggleTicketModal}
          tickets={tickets}
          onViewTicket={onViewTicket}
          onUpdateTicket={toggleTicketEdit}
          onDeleteTicket={confirmDeleteTicket}
        />
      </main>
    </Container>
  );
};
