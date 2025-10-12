import style from "./Heading.module.scss";

export const Heading = ({ src, children }) => {
  return (
    <div className={style.container} style={{ backgroundImage: `url(${src})` }}>
      {children}
    </div>
  );
};
