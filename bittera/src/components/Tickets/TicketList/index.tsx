import React, { useState } from "react";
import { Ticket } from "../../../pages/dashboard";
import {
  ButtonAdd,
  ContainerButton,
  ContainerMenu,
  ContainerSearch,
  ContainerSection,
  Item,
  List,
  ListTags,
  Section,
} from "../../Section/styles";
import { FaSearch } from "react-icons/fa";

export interface TicketListProps {
  tickets: Ticket[];
  toggleModal: () => void;
  onViewTicket: (ticketId: string) => void;
  onUpdateTicket: (id: string) => void;
  onDeleteTicket: (ticketId: string) => void;
}

export const TicketList: React.FC<TicketListProps> = ({
  tickets,
  toggleModal,
  onViewTicket,
  /* onUpdateTicket,
  onDeleteTicket, */
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTickets = tickets.filter((ticket) =>
    ticket.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <input
                placeholder="pesquisar..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </ContainerSearch>
          </ContainerButton>
        </ContainerMenu>
        <ListTags>
          <p>Título ticket</p>
          <p>Nome</p>
          <p>Data</p>
          <p>Suporte</p>
          <p>CNPJ</p>
        </ListTags>

        {filteredTickets.length > 0 ? (
          <List>
            {filteredTickets.map((ticket) => (
              <Item key={ticket.id} onClick={() => onViewTicket(ticket.id)}>
                <h3>{ticket.title}</h3>
                <p>{ticket.store?.name}</p>
                <p>{ticket.date}</p>
                <p>{ticket.user.name}</p>
                <p>{ticket.store?.cnpj}</p>
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
