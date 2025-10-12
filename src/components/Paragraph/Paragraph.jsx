import style from "./Paragraph.module.css";

export const Paragraph = ({ children }) => {
  return <div className={style.container}>{children}</div>;
};
