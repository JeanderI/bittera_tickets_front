import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { StoreList } from "../../components/Store/StoreList";
import { ModalAddStore } from "../../components/Store/CreateStore";
/* import { ModalEditStore } from "../../components/Store/ModalEditStore"; */
import { toast } from "react-toastify";
import { AuthService } from "../../contexts/UserContext";
import { Container } from "../../components/Container/styles";
import { Header } from "../../components/Header";
import ModalViewStore from "../../components/Store/ModalViewStore";
import { ModalEditStore } from "../../components/Store/ModalEditStore";

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
  const [storeItemId, setStoreItemId] = useState("");
  const [viewedStore, setViewedStore] = useState<Store | null>(null);

  const [isOpenStoreModal, setIsOpenStoreModal] = useState(false);
  const toggleStoreModal = () => setIsOpenStoreModal(!isOpenStoreModal);

  const [isOpenStoreEdit, setIsOpenStoreEdit] = useState(false);
  const toggleStoreEdit = (id: string) => {
    setIsOpenStoreEdit(true);
    setStoreItemId(id);
  };

  const closeStoreEdit = () => setIsOpenStoreEdit(false);

  const onViewStore = (storeId: string) => {
    const store = stores.find((store) => store.id === storeId);
    setViewedStore(store || null);
  };

  const confirmDeleteStore = (storeId: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta loja?")) {
      deleteStore(storeId);
    }
  };

  const deleteStore = async (storeId: string) => {
    const token = AuthService.getToken();

    try {
      const response = await api.delete(`/store/${storeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 204) {
        setStores((previousStores) =>
          previousStores.filter((store) => store.id !== storeId)
        );
        toast.success("Loja deletada com sucesso");
      } else {
        toast.error("Erro ao deletar loja");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Erro ao deletar loja: " + error.message);
      } else {
        toast.error("Erro ao deletar loja: " + String(error));
      }
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get("/store");
        setStores(response.data);
      } catch (error) {
        console.error("Erro ao buscar lojas:", error);
      }
    })();
  }, []);

  return (
    <Container>
      <Header />

      <main>
        {isOpenStoreModal && (
          <ModalAddStore
            toggleStoreModal={toggleStoreModal}
            setStores={setStores}
          />
        )}

        {isOpenStoreEdit && (
          <ModalEditStore
            toggleStoreEdit={closeStoreEdit}
            setStores={setStores}
            storeId={storeItemId}
          />
        )}

        {viewedStore && (
          <ModalViewStore
            store={viewedStore}
            onClose={() => setViewedStore(null)}
            onEditStore={toggleStoreEdit}
            onDeleteStore={confirmDeleteStore}
          />
        )}

        <StoreList
          toggleModal={toggleStoreModal}
          stores={stores}
          onViewStore={onViewStore}
          onUpdateStore={toggleStoreEdit}
          onDeleteStore={confirmDeleteStore}
        />
      </main>
    </Container>
  );
};
