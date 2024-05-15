import { useEffect, useState } from "react"
import { api } from "../../services/api"
import { SystemList } from "../../components/SystemList";


interface System {
    id: string;
    system: string;
    icon: string

}
export const System = () => {
    const [system, setSystem] = useState<System[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await api.get('/system'); 
                setSystem(response.data);
            } catch (error) {
                console.error("Erro ao buscar sistemas", error);  
            }
        })();  
    }, []);

    return (
        <main>
            <h1>sistemas</h1>
            <SystemList systems={system} />
        </main>
    )
}