import style from "./TimePicker.module.scss";

export const TimePicker = ({
  id,
  label,
  details,
  times = [],
  onChange,
  selectedTime,
  error = "",
}) => {
  const isDisabled = times.length === 0;

  return (
    <div className={style.container}>
      <label htmlFor={id}>
        {label} <span>{details}</span>
      </label>
      <select
        id={id}
        value={selectedTime}
        onChange={onChange}
        disabled={isDisabled}
      >
        {isDisabled && <option value="">Loading...</option>}

        {!isDisabled &&
          times.map((time, index) => (
            <option key={index} value={time}>
              {time}
            </option>
          ))}
      </select>

      {isDisabled && (
        <p className={style.error}>
          {error || "Select a date and number of people first."}
        </p>
      )}
    </div>
  );
};
