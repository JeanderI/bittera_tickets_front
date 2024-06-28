import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { ManagerList } from "../../components/Manager/ManagerList";
import { ModalAddManager } from "../../components/Manager/ManagerCreate";
import { Container } from "../../components/Container/styles";
import { Header } from "../../components/Header";

export interface Manager {
  id: string;
  name: string;
  phone: string;
}
export const Manager = () => {
  const [manager, setManagers] = useState<Manager[]>([]);

  const [isOpenManagerModal, setIsOpenManagerModal] = useState(false);
  const toggleManagerModal = () => setIsOpenManagerModal(!isOpenManagerModal);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get("/manager");
        setManagers(response.data);
      } catch (error) {
        console.error("Erro ao buscar gerentes", error);
      }
    })();
  }, []);

  return (
    <Container>
      <Header/>
      
      <main>
      {isOpenManagerModal && (
        <ModalAddManager
        toggleManagerModal={toggleManagerModal}
        setManagers={setManagers}
        />
      )}
        
        <ManagerList managers={manager} 
        toggleModal={toggleManagerModal}/>
      </main>
    </Container>
    
  );
};
