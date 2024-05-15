import React from "react";

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

interface TicketListProps {
    tickets: Ticket[];
}

export const TicketList: React.FC<TicketListProps> = ({ tickets }) => {
    return (
        <div>
            {tickets.length > 0 ? (
                <ul>
                    {tickets.map((ticket) => (
                        <li key={ticket.id}>
                            <h3>{ticket.title}</h3>
                            <p>{ticket.description}</p>
                            <p>{ticket.date}</p>
                            <p>{ticket.end_date}</p>
                            <p>{ticket.type ? "Tipo A" : "Tipo B"}</p>
                            <p>{ticket.support}</p>
                            <p>{ticket.user.email}</p>
                            <p>{ticket.user.name}</p>
                            <p>{ticket.store.city}</p>
                            <p>{ticket.store.cnpj}</p>
                            <p>{ticket.store.name}</p>
                            <p>{ticket.store.owner}</p>
                            <p>{ticket.store.status}</p>
                            
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nenhum ticket encontrado.</p>
            )}
        </div>
    );
};
