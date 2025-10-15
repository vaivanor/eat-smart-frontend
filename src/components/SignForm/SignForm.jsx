import style from "./SignForm.module.scss";

export const SignForm = ({ children }) => {
  return (
    <div className={style.wrapper}>
      <form className={style.container}>{children}</form>
    </div>
  );
};
