import style from "./PageWrapper.module.css";
import { Footer } from "../Footer/Footer.jsx";

export const PageWrapper = ({ children }) => {
  return (
    <div className={style.container}>
      <main className={style.mainContainer}>{children}</main>
      <Footer />
    </div>
  );
};
