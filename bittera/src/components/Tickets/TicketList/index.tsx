import React from "react";
import { Ticket } from "../../../pages/dashboard";

interface TicketListProps {
    tickets: Ticket[];
    toggleModal: () => void;
    onEditTicket: (ticketId: string) => void;
    onDeleteTicket: (ticketId: string) => void;
}

export const TicketList: React.FC<TicketListProps> = ({
    tickets,
    toggleModal,
    onEditTicket,
    onDeleteTicket,
}) => {
    return (
        <div>
            <button type="button" onClick={toggleModal}>
                Adicionar Ticket
            </button>
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
                            <div>
                                <button type="button" onClick={() => onEditTicket(ticket.id)}>
                                    Editar
                                </button>
                                <button type="button" onClick={() => onDeleteTicket(ticket.id)}>
                                    Deletar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nenhum ticket encontrado.</p>
            )}
        </div>
    );
};
