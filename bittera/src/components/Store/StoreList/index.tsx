import React from "react";
import { FaSearch } from "react-icons/fa";
import { ButtonAdd, ContainerButton, ContainerSearch, ContainerSection, ContainerMenu, Item, List, ListTags, Section } from "../../Section/styles";
import { StatusText } from "./styles";

interface Store {
    id: string;
    name: string;
    city: string;
    status: string;
    owner: string;
    cnpj: string;
}

interface StoreListProps {
    stores: Store[];
    toggleModal: () => void;
}

export const StoreList: React.FC<StoreListProps> = ({ stores, toggleModal }) => {

    return (
        <Section>
            <ContainerSection>
                <ContainerMenu>
                    <h1>Lojas</h1>
                    <ContainerButton>
                        <ButtonAdd type="button" onClick={toggleModal}>
                            + Adicionar Loja 
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
                {stores.length > 0 ? (
                    <List>
                        {stores.map((store) => (
                            <Item key={store.id}>
                                <p>{store.name}</p>
                                <p>{store.city}</p>
                                <p>{store.cnpj}</p>
                                <p>{store.owner}</p>
                                <StatusText status={store.status}>{store.status}</StatusText>
                            </Item>
                        ))}
                    </List>
                ) : (
                    <p>Nenhuma loja encontrada.</p>
                )}
            </ContainerSection>
        </Section>
    )
}
