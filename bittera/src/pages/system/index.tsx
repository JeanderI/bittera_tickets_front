import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { SystemList } from "../../components/System/SystemList";
import { ModalAddSystem } from "../../components/System/ModaladdSystem";

export interface System {
    id: string;
    system: string;
    icon: string;
}

export const System = () => {
    const [systems, setSystems] = useState<System[]>([]);
    const [isOpenSystemModal, setIsOpenSystemModal] = useState(false);

    const toggleSystemModal = () => setIsOpenSystemModal(!isOpenSystemModal);

    useEffect(() => {
        (async () => {
            try {
                const response = await api.get('/system');
                setSystems(response.data);
            } catch (error) {
                console.error("Erro ao buscar sistemas", error);
            }
        })();
    }, []);

    return (
        <main>
            {isOpenSystemModal && (
                <ModalAddSystem
                    toggleSystemModal={toggleSystemModal}
                    setSystems={setSystems}
                />
            )}
            <h1>Sistemas</h1>
            <SystemList
                systems={systems}
                toggleModal={toggleSystemModal}
            />
        </main>
    );
};
