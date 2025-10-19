import style from "./Modal.module.scss";
import { Button } from "../Button/Button.jsx";

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
    <div
      className={style.container}
      onClick={() => {
        if (typeof onCancel === "function") {
          onCancel();
        } else if (typeof onConfirm === "function") {
          onConfirm();
        }
      }}
    >
      <div className={style.info} onClick={(e) => e.stopPropagation()}>
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
