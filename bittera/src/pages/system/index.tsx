import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import { AuthService } from "../../contexts/UserContext";
import { Container } from "../../components/Container/styles";
import { Header } from "../../components/Header";
import { ModalAddSystem } from "../../components/System/ModaladdSystem";
import { ModalEditSystem } from "../../components/System/ModalEditSystem";
import { ModalViewSystem } from "../../components/System/ModalViewSystem";
import { SystemList } from "../../components/System/SystemList";

export interface System {
  id: string;
  icon: string;
  system: string;
}

export const System = () => {
  const [systems, setSystems] = useState<System[]>([]);
  const [systemItemId, setSystemItemId] = useState("");
  const [viewedSystem, setViewedSystem] = useState<System | null>(null);

  const [isOpenSystemModal, setIsOpenSystemModal] = useState(false);
  const toggleSystemModal = () => setIsOpenSystemModal(!isOpenSystemModal);

  const [isOpenSystemEdit, setIsOpenSystemEdit] = useState(false);
  const toggleSystemEdit = (id: string) => {
    setIsOpenSystemEdit(true);
    setSystemItemId(id);
  };

  const closeSystemEdit = () => setIsOpenSystemEdit(false);

  const onViewSystem = (systemId: string) => {
    const system = systems.find((system) => system.id === systemId);
    setViewedSystem(system || null);
  };

  const confirmDeleteSystem = (systemId: string) => {
    if (window.confirm("Tem certeza que deseja excluir este sistema?")) {
      deleteSystem(systemId);
    }
  };

  const deleteSystem = async (systemId: string) => {
    const token = AuthService.getToken();

    try {
      const response = await api.delete(`/system/${systemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 204) {
        setSystems((previousSystems) =>
          previousSystems.filter((system) => system.id !== systemId)
        );
        toast.success("Sistema deletado com sucesso");
      } else {
        toast.error("Erro ao deletar sistema");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Erro ao deletar sistema: " + error.message);
      } else {
        toast.error("Erro ao deletar sistema: " + String(error));
      }
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get("/system");
        setSystems(response.data);
      } catch (error) {
        console.error("Erro ao buscar sistemas:", error);
      }
    })();
  }, []);

  return (
    <Container>
      <Header />

      <main>
        {isOpenSystemModal && (
          <ModalAddSystem
            toggleSystemModal={toggleSystemModal}
            setSystems={setSystems}
          />
        )}

        {isOpenSystemEdit && (
          <ModalEditSystem
            toggleSystemEdit={closeSystemEdit}
            setSystems={setSystems}
            systemId={systemItemId}
          />
        )}

        {viewedSystem && (
          <ModalViewSystem
            system={viewedSystem}
            onClose={() => setViewedSystem(null)}
            onEditSystem={toggleSystemEdit}
            onDeleteSystem={confirmDeleteSystem}
          />
        )}

        <SystemList
          toggleModal={toggleSystemModal}
          systems={systems}
          onViewSystem={onViewSystem}
          onUpdateSystem={toggleSystemEdit}
          onDeleteSystem={confirmDeleteSystem}
        />
      </main>
    </Container>
  );
};
