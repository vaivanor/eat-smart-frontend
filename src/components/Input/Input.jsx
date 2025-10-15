import style from "./Input.module.scss";

export const Input = ({ id, label, type, value, onChange }) => {
  return (
    <div className={style.container}>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} value={value} onChange={onChange} />
    </div>
  );
};
