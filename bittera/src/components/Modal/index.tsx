import { createPortal } from "react-dom";
import { CloseButton, CloseDiv, Container } from "./styles";
import { ReactNode, useEffect, useRef } from "react";
import { IoMdCloseCircle } from "react-icons/io";
interface ModalProps {
  toggleModal: () => void;
  blockClosing?: boolean;
  children: ReactNode;
}

export const Modal = ({ toggleModal, children, blockClosing }: ModalProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!ref.current) {
        return;
      }

      if (!event.target) {
        return;
      }

      if (!ref.current.contains(event.target as HTMLElement) && !blockClosing) {
        toggleModal();
      }
    };

    window.addEventListener("mousedown", handleClick);

    return () => {
      window.removeEventListener("mousedown", handleClick);
    };
  }, [toggleModal, blockClosing]);

  const handleClose = () => {
    toggleModal();
  };

  return createPortal(
    <Container>
      <div ref={ref}>
        {!blockClosing && (
          <CloseDiv>
            <CloseButton onClick={handleClose}>
              <IoMdCloseCircle />
            </CloseButton>
          </CloseDiv>
        )}
        {children}
      </div>
    </Container>,
    document.body
  );
};
