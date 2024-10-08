import { useState } from "react";
import { createPortal } from "react-dom";

// ====================================================================
// Custom hook which creates a modal portal
// ====================================================================
const usePortal = () => {
  const modalRoot = document.getElementById("modal-root");
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const ModalPortal = ({ children }) => {
    if (!modalRoot || !isOpen) return null;

    return createPortal(
      <section className="fixed left-0 top-0 w-full h-full grid place-items-center bg-slate-800/50 backdrop-blur-sm z-50">
        {children}
      </section>,
      modalRoot
    );
  };

  return { openModal, closeModal, ModalPortal };
};

export default usePortal;
