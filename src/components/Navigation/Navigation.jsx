import style from "./Navigation.module.scss";
import { NavLink } from "react-router-dom";
import menu from "../../assets/menu.svg";
import menuClose from "../../assets/menu-close.svg";
import { useState, useEffect } from "react";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const getClass = ({ isActive }) => {
    return isActive ? style.active : "";
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

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
