import { toast } from "react-toastify";
import { Store } from "../../../pages/dashboard";
import { api } from "../../../services/api";

interface ModalAddStoreProps {
    toggleStoreModal: () => void;
    setStore: React.Dispatch<React.SetStateAction<Store[]>>;
}

/* export const ModalAddStore = ({
    toggleStoreModal,
    setStore,
}: ModalAddStoreProps) => {
    
 */
