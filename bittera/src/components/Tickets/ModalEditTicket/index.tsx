import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Modal } from "../../Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "../../../services/api";
import { UpdateTicketData, schema } from "./validation";
import { toast } from "react-toastify";
import { AuthService } from "../../../contexts/UserContext";
import { Ticket } from "../../../pages/dashboard";

interface ModalEditTicketProps {
  toggleTicketEdit: () => void;
  setTickets: Dispatch<SetStateAction<Ticket[]>>;
  ticketId: string;
}

export const ModalEditTicket = ({
  toggleTicketEdit,
  setTickets,
  ticketId,
}: ModalEditTicketProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateTicketData>({
    resolver: zodResolver(schema),
  });

  const [ticketToEdit, setTicketToEdit] = useState<Ticket | null>(null);

  useEffect(() => {
    const fetchExistingData = async () => {
      try {
        const token = AuthService.getToken();
        const response = await api.get(`/ticket/${ticketId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { data } = response;
        setTicketToEdit(data);
        Object.keys(data).forEach((key) => {
          setValue(key as keyof UpdateTicketData, data[key]);
        });
      } catch (error) {
        console.error("Error fetching existing data:", error);
      }
    };

    fetchExistingData();
  }, [ticketId, setValue]);

  const updateTask = async (data: UpdateTicketData) => {
    const token = AuthService.getToken();

    try {
      const response = await api.patch(`/ticket/${ticketId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setTickets((tickets) => {
          const updatedList = tickets.map((item) =>
            item.id === ticketId ? response.data : item
          );
          return updatedList;
        });

        toast.success("Ticket updated successfully");
        toggleTicketEdit();
      } else {
        handleError(response);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      toast.error("Error updating ticket: " + error.message);
    } else if (error && typeof error === "object" && "response" in error) {
      const err = error as { response: { status: number; data: string } };
      if (err.response.status === 409) {
        toast.error("Error updating ticket: Conflict. Ticket already exists.");
      } else if (err.response.status === 403) {
        toast.error("Error updating ticket: Access forbidden.");
      } else {
        toast.error("Error updating ticket: " + err.response.data);
      }
    } else {
      toast.error("An unknown error occurred.");
    }
  };

  const deleteTicket = async (ticketId: string) => {
    const token = AuthService.getToken();

    try {
      const response = await api.delete(`/ticket/${ticketId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 204) {
        setTickets((previousTickets) =>
          previousTickets.filter((ticket) => ticket.id !== ticketId)
        );
        toast.success("Ticket deleted successfully");
        toggleTicketEdit();
      } else {
        toast.error("Error deleting ticket");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error deleting ticket: " + error.message);
      } else {
        toast.error("Error deleting ticket: " + String(error));
      }
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      toast.error("Error updating ticket. Please check the fields.");
    }
  }, [errors]);

  return (
    <Modal toggleModal={toggleTicketEdit}>
      <form onSubmit={handleSubmit(updateTask)}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            {...register("title")}
            placeholder="Enter title"
          />
          {errors.title && <span>{errors.title.message}</span>}
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            {...register("description")}
            placeholder="Enter description"
          />
          {errors.description && <span>{errors.description.message}</span>}
        </div>

        <div>
          <label htmlFor="date">Date</label>
          <input
            type="text"
            id="date"
            {...register("date")}
            placeholder="Enter date"
          />
          {errors.date && <span>{errors.date.message}</span>}
        </div>

        <div>
          <label htmlFor="end_date">End Date</label>
          <input
            type="text"
            id="end_date"
            {...register("end_date")}
            placeholder="Enter end date"
          />
          {errors.end_date && <span>{errors.end_date.message}</span>}
        </div>

        <div>
          <label htmlFor="type">Type</label>
          <input
            type="text"
            id="type"
            {...register("type")}
            placeholder="Enter type"
          />
          {errors.type && <span>{errors.type.message}</span>}
        </div>

        <div>
          <label htmlFor="support">Support</label>
          <input
            type="text"
            id="support"
            {...register("support")}
            placeholder="Enter support message"
          />
          {errors.support && <span>{errors.support.message}</span>}
        </div>

        <div>
          <button type="submit">Update</button>
        </div>
        <div>
          <button type="button" onClick={() => deleteTicket(ticketId)}>
            Delete
          </button>
        </div>
      </form>
    </Modal>
  );
};