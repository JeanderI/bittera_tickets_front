import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { StoreList } from "../../components/Store/StoreList";
import { ModalAddStore } from "../../components/Store/CreateStore"; 
import { Container } from "../../components/Container/styles";
import { Header } from "../../components/Header";


interface Store {
  id: string;
  name: string;
  city: string;
  status: string;
  owner: string;
  cnpj: string; 
}

export const Store = () => {
  const [stores, setStores] = useState<Store[]>([]);

  const [isOpenStoreModal, setIsOpenStoreModal] = useState(false);
  const toggleStoreModal = () => setIsOpenStoreModal(!isOpenStoreModal);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get("/store");
        setStores(response.data);
      } catch (error) {
        console.error("Erro ao buscar a loja", error);
      }
    })();
  }, []);
  return (
    <Container>
      <Header/>
       
      <main>
        {isOpenStoreModal && (
          <ModalAddStore
            toggleStoreModal={toggleStoreModal}
            setStores={setStores}
          />
        )}
        <StoreList stores={stores} 
        toggleModal={toggleStoreModal}/>
      </main>
    </Container>
    
  );
};
