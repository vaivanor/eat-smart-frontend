import { useState } from "react";

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalProps, setModalProps] = useState({});

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

    const wrappedOnCancel = async () => {
      if (onCancel) await onCancel();
      hideModal();
    };

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
