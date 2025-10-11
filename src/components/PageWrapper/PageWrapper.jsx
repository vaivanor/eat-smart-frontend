import style from "./PageWrapper.module.css";

export const PageWrapper = ({ children }) => {
  return (
    <>
      <main className={style.container}>{children}</main>
    </>
  );
};
