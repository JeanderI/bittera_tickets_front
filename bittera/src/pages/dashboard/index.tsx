import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { TicketList } from "../../components/TicketList";  

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
  
  interface Ticket {
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
        <main>
            <h1>Tickets</h1>
            <TicketList tickets={tickets} />
        </main>
    );
};
