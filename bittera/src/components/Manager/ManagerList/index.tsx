import React, { useState } from "react";
import {
  ButtonAdd,
  ContainerButton,
  ContainerSearch,
  ContainerSection,
  ContainerMenu,
  Item,
  List,
  ListTags,
  Section,
} from "../../Section/styles";
import { FaSearch } from "react-icons/fa";

interface Manager {
  id: string;
  name: string;
  phone: string;
}

interface ManagerListProps {
  managers: Manager[];
  toggleModal: () => void;
  onViewManager: (managerId: string) => void;
  onUpdateManager: (id: string) => void;
  onDeleteManager: (managerId: string) => void;
}

export const ManagerList: React.FC<ManagerListProps> = ({
  managers,
  toggleModal,
  onViewManager,
  /* onUpdateManager,
  onDeleteManager */
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredManagers = managers.filter((manager) =>
    manager.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Section>
      <ContainerSection>
        <ContainerMenu>
          <h1>Gerentes</h1>
          <ContainerButton>
            <ButtonAdd type="button" onClick={toggleModal}>
              Adicionar gerente
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
          <p>Nome</p>
          <p>Telefone</p>
        </ListTags>
        {filteredManagers.length > 0 ? (
          <List>
            {filteredManagers.map((manager) => (
              <Item key={manager.id} onClick={() => onViewManager(manager.id)}>
                <h3>{manager.name}</h3>
                <p>{manager.phone}</p>
              </Item>
            ))}
          </List>
        ) : (
          <p>Nenhum gerente encontrado.</p>
        )}
      </ContainerSection>
    </Section>
  );
};
