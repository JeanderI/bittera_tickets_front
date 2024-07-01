import React from "react";
import { Modal } from "../../Modal";
import { ContainerButton } from "../../Section/styles";
import { Manager } from "../../../pages/manager";
import {
  Button,
  Container,
  DeleteButton,
  TextInfo,
  Title,
} from "../../Tickets/ModalviewTicket/styles";

interface ModalViewManagerProps {
  manager: Manager;
  onClose: () => void;
  onEditManager: (managerId: string) => void;
  onDeleteManager: (managerId: string) => void;
}

const ModalViewManager: React.FC<ModalViewManagerProps> = ({
  manager,
  onClose,
  onEditManager,
  onDeleteManager,
}) => {
  return (
    <Modal toggleModal={onClose}>
      <Container>
        <Title>Detalhes do Gerente</Title>
        <TextInfo>Nome: {manager.name}</TextInfo>
        <TextInfo>Telefone: {manager.phone}</TextInfo>
        <ContainerButton>
          <Button onClick={() => onEditManager(manager.id)}>Editar</Button>
          <DeleteButton onClick={() => onDeleteManager(manager.id)}>
            Deletar
          </DeleteButton>
        </ContainerButton>
      </Container>
    </Modal>
  );
};

export default ModalViewManager;
