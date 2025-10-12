import style from "./Button.module.scss";
import { useMemo } from "react";

export const Button = ({ type = "info", text, onClick }) => {
  const typeClass = useMemo(() => {
    return {
      primary: style.primary,
      secondary: style.secondary,
    }[type];
  }, [type]);

  return (
    <button className={`${style.button} ${typeClass}`} onClick={onClick}>
      {text}
    </button>
  );
};
