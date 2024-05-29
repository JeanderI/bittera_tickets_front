import React from "react";

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
        <div>
             <button type="button" onClick={toggleModal}>
                Adicionar sistema
            </button>
            {systems.length > 0 ? (
                <ul>
                    {systems.map((system) => (
                        <li key={system.id}>
                            <h3>{system.system}</h3>
                            <p>{system.icon}</p>
                        
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nenhum sistema encontrado.</p>
            )}
        </div>
    )
}