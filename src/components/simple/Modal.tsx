// components/Modal.tsx
import React, { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-[black] opacity-60"
        onClick={onClose}
      ></div>
      <div
        className="relative p-8 rounded-lg shadow-lg"
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
