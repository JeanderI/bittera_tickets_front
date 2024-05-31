import React from "react";
import { ButtonAdd, ContainerButton, ContainerMenu, ContainerSearch, ContainerSection, Item, List, ListTags, Section } from "../../Section/styles";
import { FaSearch } from "react-icons/fa";

interface System {
    id: string;
    system: string;
    icon: string
}
interface SystemListProps {
    systems: System[];
    toggleModal: () => void;
}

    export const SystemList: React.FC<SystemListProps> = ({ systems, toggleModal }) => {
   
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
           
             
                {systems.length > 0 ? (
                    <List>
                        {systems.map((system) => (
                            <Item key={system.id}>
                                <h3>{system.system}</h3>
                                <p>{system.icon}</p>
                            
                            </Item>
                        ))}
                    </List>
                ) : (
                    <p>Nenhum sistema encontrado.</p>
                )}

            </ContainerSection>
        </Section>
    )
}