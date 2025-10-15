import style from "./Input.module.scss";

export const Input = ({
  id,
  label,
  type,
  value,
  placeholder = "",
  onChange,
  error,
}) => {
  return (
    <div className={style.container}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <p className={style.error}>{error}</p>}
    </div>
  );
};
