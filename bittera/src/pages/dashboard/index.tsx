import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { TicketList } from "../../components/Tickets/TicketList";  
import { ModalAddTicket } from "../../components/Tickets/ModalAddTicket";
import { ModalEditTicket } from "../../components/Tickets/ModalEditTicket";
import { toast } from "react-toastify"; // Adicionado toast para notificação
import { AuthService } from "../../contexts/UserContext";

interface User {
    id: string;
    name: string;
    email: string;
    password: string;
}
  
interface Store {
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
}

export const Dashboard = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [ticketItemId, setTicketItemId] = useState("");

    const [isOpenTicketModal, setIsOpenTicketModal] = useState(false);
	const toggleTicketModal = () => setIsOpenTicketModal(!isOpenTicketModal);

    const [isOpenTicketEdit, setIsOpenTicketEdit] = useState(false);
	const toggleTicketEdit = (id: string) => {
		setIsOpenTicketEdit(!isOpenTicketEdit);
		setTicketItemId(id);
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
                toast.success("Ticket deleted successfully");
            } else {
                toast.error("Error deleting ticket");
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error("Error deleting ticket: " + error.message);
            } else {
                toast.error("Error deleting ticket: " + String(error));
            }
        }
    };

    useEffect(() => {
        (async () => {
            try {
                const response = await api.get('/ticket');
                setTickets(response.data);
            } catch (error) {
                console.error("Erro ao buscar tickets:", error);
            }
        })();
    }, []);

    return (
        <div>
            {isOpenTicketModal && (
				<ModalAddTicket
					toggleTicketModal={toggleTicketModal}
					setTickets={setTickets}
				/>
			)}

            {isOpenTicketEdit && (
				<ModalEditTicket
					toggleTicketEdit={() =>
						toggleTicketEdit(ticketItemId)
					}
					setTickets={setTickets}
					ticketId={ticketItemId}
				/>
			)} 
            <main>
                <h1>Tickets</h1>
                <TicketList
                    toggleModal={toggleTicketModal}
                    tickets={tickets} 
                    onEditTicket={toggleTicketEdit}
                    onDeleteTicket={deleteTicket}
                />
            </main>
        </div>
    );
};
