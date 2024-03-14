import React, { useState } from "react";
import { createPortal } from "react-dom";

const useTooltip = () => {
  const modalRoot = document.getElementById("modal-root");
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const showTooltip = (event) => {
    setIsVisible(true);
    setPosition({ x: event.clientX, y: event.clientY });
  };

  const hideTooltip = () => {
    setIsVisible(false);
  };

  const Tooltip = ({ children }) => {
    if (!modalRoot || !isVisible) return null;
    return (
      <>
        {isVisible &&
          createPortal(
            <div
              style={{
                position: "fixed",
                top: position.y + 10,
                left: position.x + 10,
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                color: "#fff",
                padding: "4px 8px",
                borderRadius: "4px",
                zIndex: 9999,
              }}
            >
              {children}
            </div>,
            modalRoot
          )}
      </>
    );
  };

  return { Tooltip, showTooltip, hideTooltip };
};

export default useTooltip;
