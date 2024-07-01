import React from "react";
import { Modal } from "../../Modal";
import { System } from "../../../pages/system";
import { ContainerButton } from "../../Section/styles";
import { Button } from "../../Tickets/ModalEditTicket/styles";
import {
  Container,
  DeleteButton,
  TextInfo,
  Title,
} from "../../Tickets/ModalviewTicket/styles";
import { LogoSystem } from "../SystemList/styles";

interface ModalViewSystemProps {
  system: System;
  onClose: () => void;
  onEditSystem: (systemId: string) => void;
  onDeleteSystem: (systemId: string) => void;
}

export const ModalViewSystem: React.FC<ModalViewSystemProps> = ({
  system,
  onClose,
  onEditSystem,
  onDeleteSystem,
}) => {
  if (!system) return null;

  return (
    <Modal toggleModal={onClose}>
      <Container>
        <Title>Detalhes do Sistema</Title>
        <TextInfo>Nome:{system.system}</TextInfo>
        <LogoSystem>
          <img src={system.icon} alt="System Icon" />
        </LogoSystem>

        <ContainerButton>
          <Button onClick={() => onEditSystem(system.id)}>Editar</Button>
          <DeleteButton onClick={() => onDeleteSystem(system.id)}>
            Deletar
          </DeleteButton>
        </ContainerButton>
      </Container>
    </Modal>
  );
};
