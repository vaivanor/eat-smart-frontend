import style from "./PageWrapper.module.scss";
import { Footer } from "../Footer/Footer.jsx";
import { Header } from "../Header/Header.jsx";

export const PageWrapper = ({ children, backgroundSrc }) => {
  const backgroundStyle = backgroundSrc
    ? { backgroundImage: `url(${backgroundSrc})` }
    : {};
  return (
    <div className={style.container}>
      <Header />
      <main
        className={`${style.mainContainer} ${
          backgroundSrc ? style.background : ""
        }`}
        style={backgroundStyle}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};
