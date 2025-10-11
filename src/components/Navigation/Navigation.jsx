import style from "./Navigation.module.scss";
import { NavLink } from "react-router-dom";
import menu from "../../assets/menu.svg";
import menuClose from "../../assets/menu-close.svg";
import { useState } from "react";

export const Navigation = () => {
  const getClass = ({ isActive }) => {
    return isActive ? style.active : "";
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <button className={style.menu} onClick={toggleMenu}>
        <img className={style.img} src={isOpen ? menuClose : menu} alt="Menu" />
      </button>

      <nav className={`${style.container} ${isOpen ? style.open : ""}`}>
        <NavLink to={"/"} className={getClass}>
          Home
        </NavLink>
        <NavLink to={"/restaurants"} className={getClass}>
          Restaurants
        </NavLink>
      </nav>
    </>
  );
};
