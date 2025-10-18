import style from "./Breadcrumbs.module.scss";

export const Breadcrumbs = ({ items }) => {
  return (
    <div className={style.container}>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item}
            {index < items.length - 1 && (
              <span className={style.separator}></span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
