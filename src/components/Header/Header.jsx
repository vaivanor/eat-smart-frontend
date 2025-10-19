import logo from "../../assets/icons/logo.svg";
import style from "./Header.module.scss";
import { Link } from "react-router-dom";
import { Navigation } from "../Navigation/Navigation.jsx";

export const Header = () => {
  return (
    <header className={style.header}>
      <Link to={"/"}>
        <img className={style.img} src={logo} alt="EatSmart logo." />
      </Link>
      <Navigation />
    </header>
  );
};
