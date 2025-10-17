import style from "./DatePicker.module.scss";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const DatePicker = ({
  id,
  label,
  details,
  workingHours,
  selectedDate,
  onChange,
}) => {
  const allowedDays = Object.keys(workingHours);

  const isDateAllowed = (date) => {
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    return allowedDays.includes(dayName);
  };

  return (
    <div className={style.container}>
      <label htmlFor={id}>
        {label} <span> {details}</span>
      </label>
      <ReactDatePicker
        selected={selectedDate}
        onChange={onChange}
        minDate={new Date()}
        maxDate={new Date(new Date().setMonth(new Date().getMonth() + 3))}
        filterDate={isDateAllowed}
        dateFormat="yyyy-MM-dd"
      />
    </div>
  );
};
