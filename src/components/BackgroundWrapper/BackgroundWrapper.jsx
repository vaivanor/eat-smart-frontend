import style from "./BackgroundWrapper.module.scss";

export const BackgroundWrapper = ({ src, children }) => {
  const backgroundStyle = src ? { backgroundImage: `url(${src})` } : {};

  return (
    <div className={style.container} style={backgroundStyle}>
      {children}
    </div>
  );
};
