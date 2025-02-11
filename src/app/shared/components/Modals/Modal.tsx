"use client";
import React, { useEffect } from "react";
import ReactPortal from "./ReactPortal";

function Modal({
  children,
  isOpen,
  handleClose,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  handleClose: () => void;
}) {

  useEffect(() => {
    const closeOnScape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    document.addEventListener("keydown", closeOnScape);
    return () => document.removeEventListener("keydown", closeOnScape);
  }, [handleClose]);


  if (!isOpen) return null;
  return (
    <ReactPortal wrapperId="modal">
      <div className="fixed top-0 left-0 w-screen h-screen bg-neutral-800/50 z-50">
        <div className="fixed top-1/2 left-1/2 w-full sm:w-fit sm:h-fit bg-bg-primary p-4 rounded translate-x-[-50%] translate-y-[-50%]">
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                ...child.props,
                handleClose,
                isOpen,
              });
            }
            return child;
          })}
        </div>
      </div>
    </ReactPortal>
  );
}

export default Modal;