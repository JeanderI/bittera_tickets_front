import React from "react";

import { Modal } from "../../Modal";
import { ContainerButton } from "../../Section/styles";
import {
  Button,
  Container,
  DeleteButton,
  TextInfo,
  Title,
} from "../../Tickets/ModalviewTicket/styles";
import { Store } from "../../../pages/dashboard";

interface ModalViewStoreProps {
  store: Store;
  onClose: () => void;
  onEditStore: (storeId: string) => void;
  onDeleteStore: (storeId: string) => void;
}

const ModalViewStore: React.FC<ModalViewStoreProps> = ({
  store,
  onClose,
  onEditStore,
  onDeleteStore,
}) => {
  return (
    <Modal toggleModal={onClose}>
      <Container>
        <Title>Detalhes do Ticket</Title>
        <TextInfo>Título: {store.city}</TextInfo>
        <TextInfo>Nome da Loja: {store.cnpj}</TextInfo>
        <TextInfo>Data: {store.name}</TextInfo>
        <TextInfo>Suporte: {store.owner}</TextInfo>
        <TextInfo>CNPJ: {store.status}</TextInfo>
        <ContainerButton>
          <Button onClick={() => onEditStore(store.id)}>Editar</Button>
          <DeleteButton onClick={() => onDeleteStore(store.id)}>
            Deletar
          </DeleteButton>
        </ContainerButton>
      </Container>
    </Modal>
  );
};

export default ModalViewStore;
