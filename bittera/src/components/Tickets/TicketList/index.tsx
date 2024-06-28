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
                    <p>Titulo ticket</p>
                    <p>Nome</p>
                    <p>Data</p>
                    <p>suporte</p>
                    <p>CNPJ</p>
                    
                </ListTags>
            
                {tickets.length > 0 ? (
                    <List>
                        {tickets.map((ticket) => (
                            <Item key={ticket.id}>
                                <h3>{ticket.title}</h3>
                                <p>{ticket.store.name}</p>
                                <p>{ticket.date}</p>                           
                                <p>{ticket.support}</p>
                                <p>{ticket.store.cnpj}</p>
                                
                                
                                
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
