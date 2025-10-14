import { useState } from "react";

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalProps, setModalProps] = useState({});

  const showModal = ({
    text,
    confirmText,
    cancelText,
    onConfirm,
    onCancel,
  }) => {
    setModalProps({
      text,
      confirmText,
      cancelText,
      onConfirm,
      onCancel,
    });
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
    setModalProps({});
  };

  return {
    isOpen,
    modalProps,
    showModal,
    hideModal,
  };
};
