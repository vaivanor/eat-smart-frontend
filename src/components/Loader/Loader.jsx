import style from "./Loader.module.scss";

export const Loader = () => {
  return (
    <div className={style.container}>
      <div className={style.spinner}></div>
    </div>
  );
};
