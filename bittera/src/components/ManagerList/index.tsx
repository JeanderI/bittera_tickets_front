import React from "react";

interface Manager {
    id: string;
    name: string;
    phone: string
}


interface ManagerListProps {
    managers: Manager[];
}

export const ManagerList: React.FC<ManagerListProps> = ({ managers }) => {
   
    return (
        <div>
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