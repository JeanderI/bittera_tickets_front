import React, { useState } from "react";
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
import { LogoSystem } from "./styles";

interface System {
  id: string;
  system: string;
  icon: string;
}

interface SystemListProps {
  systems: System[];
  toggleModal: () => void;
  onViewSystem: (systemId: string) => void;
  onUpdateSystem: (id: string) => void;
  onDeleteSystem: (systemId: string) => void;
}

export const SystemList: React.FC<SystemListProps> = ({
  systems,
  toggleModal,
  onViewSystem,
  /* onUpdateSystem,
  onDeleteSystem, */
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSystems = systems.filter((system) =>
    system.system.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Section>
      <ContainerSection>
        <ContainerMenu>
          <h1>Sistemas</h1>
          <ContainerButton>
            <ButtonAdd type="button" onClick={toggleModal}>
              + Adicionar sistema
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
          <p>Logo</p>
        </ListTags>

        {systems.length > 0 ? (
          <List>
            {filteredSystems.map((system) => (
              <Item key={system.id} onClick={() => onViewSystem(system.id)}>
                <h3>{system.system}</h3>
                <LogoSystem>
                  <img src={system.icon} alt="System Icon" />
                </LogoSystem>
              </Item>
            ))}
          </List>
        ) : (
          <p>Nenhum sistema encontrado.</p>
        )}
      </ContainerSection>
    </Section>
  );
};
