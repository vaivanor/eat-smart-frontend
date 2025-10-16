import style from "./Input.module.scss";

export const Input = ({
  id,
  label,
  type,
  value,
  onChange,
  error = "",
  details = "",
}) => {
  return (
    <div className={style.container}>
      <label htmlFor={id}>
        {label} <span> {details}</span>
      </label>

      <input id={id} type={type} value={value} onChange={onChange} />
      {error && <p className={style.error}>{error}</p>}
    </div>
  );
};
