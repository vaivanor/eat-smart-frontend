import { useState, useEffect } from "react";

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalProps, setModalProps] = useState({});

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        if (typeof modalProps.onCancel === "function") {
          modalProps.onCancel();
        } else if (typeof modalProps.onConfirm === "function") {
          modalProps.onConfirm();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, modalProps]);

  const hideModal = () => {
    setIsOpen(false);
    setModalProps({});
  };

  const showModal = ({
    text,
    confirmText,
    cancelText,
    onConfirm,
    onCancel,
  }) => {
    const wrappedOnConfirm = async () => {
      if (onConfirm) await onConfirm();
      hideModal();
    };

    const wrappedOnCancel = onCancel
      ? async () => {
          await onCancel();
          hideModal();
        }
      : undefined;

    setModalProps({
      text,
      confirmText,
      cancelText,
      onConfirm: wrappedOnConfirm,
      onCancel: wrappedOnCancel,
    });

    setIsOpen(true);
  };

  return {
    isOpen,
    modalProps,
    showModal,
    hideModal,
  };
};
