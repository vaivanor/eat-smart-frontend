import email from "../../assets/icons/email-light.svg";
import phone from "../../assets/icons/phone-light.svg";
import instagram from "../../assets/icons/instagram-light.svg";
import facebook from "../../assets/icons/facebook-light.svg";
import style from "./Footer.module.scss";

export const Footer = () => {
  return (
    <>
      <footer className={style.container}>
        <div className={style.flexContainer}>
          <div>
            <h3>Contact Us</h3>
            <div className={style.block}>
              <img src={email} alt="Email icon." />
              <a href="mailto:eatsmart@gmail.com">eatsmart@gmail.com</a>
            </div>
            <div className={style.block}>
              <img src={phone} alt="Phone icon." />
              <p>+37061234567</p>
            </div>
          </div>
          <div>
            <h3>Follow Us</h3>
            <div className={style.block}>
              <img src={facebook} alt="Facebook icon." />
              <a href="#">EatSmart</a>
            </div>
            <div className={style.block}>
              <img src={instagram} alt="Instagram icon" />
              <a href="#">EatSmart</a>
            </div>
          </div>
        </div>
        <p>eatsmart.com © 2025</p>
      </footer>
    </>
  );
};
