import style from "./Form.module.scss";

export const Form = ({ children }) => {
  return (
    <div className={style.wrapper}>
      <form className={style.container}>{children}</form>
    </div>
  );
};
