import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { ManagerList } from "../../components/Manager/ManagerList";
import { Container } from "../../components/Container/styles";
import { Header } from "../../components/Header";
import { ModalAddManager } from "../../components/Manager/ManagerCreate";
import ModalViewManager from "../../components/Manager/ModalViewManager";
import { AuthService } from "../../contexts/UserContext";
import { toast } from "react-toastify";
import { ModalEditManager } from "../../components/Manager/ModalEditManager";

export interface Manager {
  id: string;
  name: string;
  phone: string;
}
export const Manager = () => {
  const [managers, setManagers] = useState<Manager[]>([]);
  const [managerItemId, setManagerItemId] = useState("");
  const [viewedManager, setViewedManager] = useState<Manager | null>(null);

  const [isOpenManagerModal, setIsOpenManagerModal] = useState(false);
  const toggleManagerModal = () => setIsOpenManagerModal(!isOpenManagerModal);

  const [isOpenManagerEdit, setIsOpenManagerEdit] = useState(false);
  const toggleManagerEdit = (id: string) => {
    setIsOpenManagerEdit(true);
    setManagerItemId(id);
  };

  const closeManagerEdit = () => setIsOpenManagerEdit(false);

  const onViewManager = (managerId: string) => {
    const manager = managers.find((manager) => manager.id === managerId);
    setViewedManager(manager || null);
  };

  const confirmDeleteManager = (managerId: string) => {
    if (window.confirm("Tem certeza que deseja excluir este gerente?")) {
      deleteManager(managerId);
    }
  };

  const deleteManager = async (managerId: string) => {
    const token = AuthService.getToken();

    try {
      const response = await api.delete(`/manager/${managerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 204) {
        setManagers((previousManager) =>
          previousManager.filter((manager) => manager.id !== managerId)
        );
        toast.success("gerente deletado com sucesso");
      } else {
        toast.error("Erro ao deletar ticket");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Erro ao deletar ticket: " + error.message);
      } else {
        toast.error("Erro ao deletar ticket: " + String(error));
      }
    }
  };

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
      <Header />

      <main>
        {isOpenManagerModal && (
          <ModalAddManager
            toggleManagerModal={toggleManagerModal}
            setManagers={setManagers}
          />
        )}

        {isOpenManagerEdit && (
          <ModalEditManager
            toggleManagerEdit={closeManagerEdit}
            setManagers={setManagers}
            managerId={managerItemId}
          />
        )}

        {viewedManager && (
          <ModalViewManager
            manager={viewedManager}
            onClose={() => setViewedManager(null)}
            onEditManager={toggleManagerEdit}
            onDeleteManager={confirmDeleteManager}
          />
        )}

        <ManagerList
          toggleModal={toggleManagerModal}
          managers={managers}
          onViewManager={onViewManager}
          onUpdateManager={toggleManagerEdit}
          onDeleteManager={confirmDeleteManager}
        />
      </main>
    </Container>
  );
};
