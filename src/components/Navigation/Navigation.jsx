import style from "./Navigation.module.css";
import { NavLink } from "react-router-dom";

export const Navigation = () => {
  const getClass = ({ isActive }) => {
    return isActive ? style.active : "";
  };

  return (
    <nav className={style.container}>
      <div>
        <NavLink to={"/"} className={getClass}>
          Home
        </NavLink>
        <NavLink to={"/restaurants"} className={getClass}>
          Restaurants
        </NavLink>
      </div>
    </nav>
  );
};
