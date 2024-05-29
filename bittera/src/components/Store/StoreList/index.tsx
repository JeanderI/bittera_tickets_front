import React from "react";

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
        <section>
            <button type="button" onClick={toggleModal}>
                Adicionar Loja
            </button>
            {stores.length > 0 ? (
                <ul>
                    {stores.map((store) => (
                        <li key={store.id}>
                            <h3>{store.name}</h3>
                            <p>{store.city}</p>
                            <p>{store.cnpj}</p>
                            <p>{store.owner}</p>
                            <p>{store.status}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nenhuma loja encontrada.</p>
            )}
        </section>
    )
}
