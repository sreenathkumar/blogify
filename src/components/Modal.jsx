import { createPortal } from "react-dom";

const Modal = ({ children }) => {
  const modalRoot = document.getElementById("modal-root");

  return createPortal(
    <section className="fixed left-0 top-0 w-full h-full grid place-items-center bg-slate-800/50 backdrop-blur-sm z-50">
      {children}
    </section>,
    modalRoot
  );
};

export default Modal;
