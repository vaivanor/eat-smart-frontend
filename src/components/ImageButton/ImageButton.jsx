import style from "./ImageButton.module.scss";

export const ImageButton = ({ src, alt, onClick }) => {
  return (
    <div>
      <button className={style.button} onClick={onClick}>
        <img src={src} alt={alt} />
      </button>
    </div>
  );
};
