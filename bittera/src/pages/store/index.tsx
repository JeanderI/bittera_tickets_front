import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { StoreList } from "../../components/Store/StoreList";

interface Store {
  id: string;
  name: string;
  city: string;
  status: string;
  owner: string;
  cnpj: string;
}

export const Store = () => {
  const [stores, setStore] = useState<Store[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await api.get("/store");
        setStore(response.data);
      } catch (error) {
        console.error("Erro ao buscar a loja", error);
      }
    })();
  }, []);
  return (
    <main>
      <h1>stores</h1>
      <StoreList stores={stores} />
    </main>
  );
};
