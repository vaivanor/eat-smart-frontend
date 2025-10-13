import style from "./InfoRow.module.scss";

export const InfoRow = ({ icon, text, alt }) => {
  return (
    <div className={style.container}>
      <img src={icon} alt={alt} />
      <p>{text}</p>
    </div>
  );
};
