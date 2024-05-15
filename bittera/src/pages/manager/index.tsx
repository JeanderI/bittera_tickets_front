import { useEffect, useState } from "react"
import { api } from "../../services/api"
import { ManagerList } from "../../components/ManagerList";

interface Manager {
    id: string;
    name: string;
    phone: string

}
export const Manager = () => {
    const [manager, setManager] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await api.get('/manager'); 
                setManager(response.data);
            } catch (error) {
                console.error("Erro ao buscar gerentes", error);  
            }
        })();  
    }, []);

    return (
        <main>
            <h1>Gerentes</h1>
            <ManagerList managers={manager} />
        </main>
    )
}