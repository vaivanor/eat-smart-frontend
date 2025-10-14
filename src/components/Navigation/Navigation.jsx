import style from "./Navigation.module.scss";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import menu from "../../assets/menu.svg";
import menuClose from "../../assets/menu-close.svg";
import { useState, useEffect } from "react";
import { useAppContext } from "../../store/AppContext";
import { useMediaQuery } from "react-responsive";
import { Button } from "../Button/Button";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, handleLogout } = useAppContext();

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

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const buttonType = isMobile ? "secondary" : "primary";

  const navigate = useNavigate();

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
        {isLoggedIn && (
          <NavLink to={"/reservations"} className={getClass}>
            Reservations
          </NavLink>
        )}
        {isLoggedIn && (
          <NavLink to={"/profile"} className={getClass}>
            Profile
          </NavLink>
        )}
        {isLoggedIn ? (
          <Button type="secondary" text="Sign Out" onClick={handleLogout} />
        ) : (
          <Button
            type={buttonType}
            text="Sign In"
            onClick={() => navigate("/sign-in")}
          />
        )}
      </nav>
    </>
  );
};
