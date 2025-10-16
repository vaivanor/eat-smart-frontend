import style from "./TextArea.module.scss";

export const TextArea = ({
  id,
  label,
  value,
  onChange,
  error = "",
  details = "",
}) => {
  return (
    <div className={style.container}>
      <label htmlFor={id}>
        {label} <span>{details}</span>
      </label>

      <textarea id={id} value={value} onChange={onChange} rows="10" />

      {error && <p className={style.error}>{error}</p>}
    </div>
  );
};
