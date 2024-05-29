import React from "react";

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
        <div>
            <button type="button" onClick={toggleModal}>
                Adicionar Loja
            </button>
            {managers.length > 0 ? (
                <ul>
                    {managers.map((manager) => (
                        <li key={manager.id}>
                            <h3>{manager.name}</h3>
                            <p>{manager.phone}</p>
                        
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nenhum gerente encontrado.</p>
            )}
        </div>
    )
}