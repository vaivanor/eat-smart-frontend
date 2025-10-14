import { Button } from "../Button/Button.jsx";
import style from "./Modal.module.scss";

export const Modal = ({
  isOpen,
  text,
  confirmText = "Ok",
  cancelText,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;
  return (
    <div className={style.container}>
      <div className={style.info}>
        <p>{text}</p>
        <div className={style.buttonContainer}>
          {cancelText && (
            <div>
              <Button text={cancelText} type="secondary" onClick={onCancel} />
            </div>
          )}
          {confirmText && (
            <div>
              <Button text={confirmText} type="primary" onClick={onConfirm} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
