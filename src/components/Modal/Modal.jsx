import { Button } from "../Button/Button.jsx";
import style from "./Modal.module.scss";

export const Modal = ({ text, confirmText, cancelText }) => {
  return (
    <div className={style.container}>
      <div className={style.info}>
        <p>{text}</p>
        <div className={style.buttonContainer}>
          <div>
            <Button text={cancelText} type="secondary" />
          </div>
          <div>
            <Button text={confirmText} type="primary" />
          </div>
        </div>
      </div>
    </div>
  );
};
