import React from "react";
import { ButtonAdd, ContainerButton, ContainerSearch, ContainerSection, ContainerMenu, Item, List, ListTags, Section } from "../../Section/styles";
import { FaSearch } from "react-icons/fa";

interface Manager {
    id: string;
    name: string;
    phone: string
}


interface ManagerListProps {
    managers: Manager[];
    toggleModal: () => void;
}

export const ManagerList: React.FC<ManagerListProps> = ({ managers, toggleModal }) => {
   
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
                            <input placeholder="pesquisar..." type="text" />
                        </ContainerSearch>    
                    </ContainerButton>  
                </ContainerMenu>

                <ListTags>
                    <p>Nome</p>
                    <p>Telefone</p>
                    <p>CNPJ</p>
                    <p>Gerente</p>
                    <p>Status</p>
                </ListTags>
                    {managers.length > 0 ? (
                        <List>
                            {managers.map((manager) => (
                                <Item key={manager.id}>
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
    )
}