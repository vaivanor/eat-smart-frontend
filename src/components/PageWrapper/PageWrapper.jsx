import style from "./PageWrapper.module.css";
import { Footer } from "../Footer/Footer.jsx";
import { Header } from "../Header/Header.jsx";

export const PageWrapper = ({ children }) => {
  return (
    <div className={style.container}>
      <Header />
      <main className={style.mainContainer}>{children}</main>
      <Footer />
    </div>
  );
};
