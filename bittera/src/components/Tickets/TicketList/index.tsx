import React from "react";
import { Ticket } from "../../../pages/dashboard";
import { ButtonAdd, ContainerButton, ContainerMenu, ContainerSearch, ContainerSection, Item, List, ListTags, Section } from "../../Section/styles";
import { FaSearch } from "react-icons/fa";

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
        <Section>
            <ContainerSection>
            <ContainerMenu>
                    <h1>Tickets</h1>
                    <ContainerButton>
                        <ButtonAdd type="button" onClick={toggleModal}>
                            + Adicionar ticket
                        </ButtonAdd>

                        <ContainerSearch>
                            <FaSearch />
                            <input placeholder="pesquisar..." type="text" />
                        </ContainerSearch>
                       
                    </ContainerButton>
                   
                </ContainerMenu>
                <ListTags>
                    <p>Nome</p>
                    <p>Cidade</p>
                    <p>CNPJ</p>
                    <p>Gerente</p>
                    <p>Status</p>
                </ListTags>
            
                {tickets.length > 0 ? (
                    <List>
                        {tickets.map((ticket) => (
                            <Item key={ticket.id}>
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
                             {/*    <div>
                                    <button type="button" onClick={() => onEditTicket(ticket.id)}>
                                        Editar
                                    </button>
                                    <button type="button" onClick={() => onDeleteTicket(ticket.id)}>
                                        Deletar
                                    </button>
                                </div> */}
                            </Item>
                    ))}
                    </List>
            ) : (
                <p>Nenhum ticket encontrado.</p>
            )}
            </ContainerSection>
        </Section>
    );
};
