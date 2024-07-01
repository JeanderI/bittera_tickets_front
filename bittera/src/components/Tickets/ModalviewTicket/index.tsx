import React from "react";
import { Ticket } from "../../../pages/dashboard";
import { Modal } from "../../Modal";
import {
  Button,
  Container,
  Title,
  TextInfo,
  DownloadButton,
  DeleteButton,
} from "./styles";
import { PDFDownloadLink } from "@react-pdf/renderer";
import TicketPDF from "../PdfTickets";
import { ContainerButton } from "../../Section/styles";

interface ModalViewTicketProps {
  ticket: Ticket;
  onClose: () => void;
  onEditTicket: (ticketId: string) => void;
  onDeleteTicket: (ticketId: string) => void;
}

const ModalViewTicket: React.FC<ModalViewTicketProps> = ({
  ticket,
  onClose,
  onEditTicket,
  onDeleteTicket,
}) => {
  return (
    <Modal toggleModal={onClose}>
      <Container>
        <Title>Detalhes do Ticket</Title>
        <TextInfo>Título: {ticket.title}</TextInfo>
        <TextInfo>Nome da Loja: {ticket.store?.name}</TextInfo>
        <TextInfo>Data: {ticket.date}</TextInfo>
        <TextInfo>Suporte: {ticket.support}</TextInfo>
        <TextInfo>CNPJ: {ticket.store?.cnpj}</TextInfo>
        <ContainerButton>
          <Button onClick={() => onEditTicket(ticket.id)}>Editar</Button>
          <DeleteButton onClick={() => onDeleteTicket(ticket.id)}>
            Deletar
          </DeleteButton>
          <PDFDownloadLink
            document={<TicketPDF ticket={ticket} />}
            fileName="ticket.pdf"
          >
            {({ loading }) => (
              <DownloadButton>
                {loading ? "Carregando PDF..." : "Baixar PDF"}
              </DownloadButton>
            )}
          </PDFDownloadLink>
        </ContainerButton>
      </Container>
    </Modal>
  );
};

export default ModalViewTicket;
