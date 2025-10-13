import style from "./GridWrapper.module.scss";
import { useMemo } from "react";

export const GridWrapper = ({ children, type, typeTheme, columns = 2 }) => {
  const typeClass = useMemo(() => {
    return {
      left: style.left,
      center: style.center,
    }[type];
  }, [type]);
  const typeClassTheme = useMemo(() => {
    return {
      light: style.light,
      dark: style.dark,
    }[typeTheme];
  }, [typeTheme]);
  return (
    <div
      className={`${style.container} ${typeClass} ${typeClassTheme}`}
      style={{ "--columns": columns }}
    >
      {children}
    </div>
  );
};
