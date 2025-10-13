import style from "./Card.module.scss";
import cityIcon from "../../assets/icons/city.svg";
import cuisineIcon from "../../assets/icons/cuisine.svg";
import rateIcon from "../../assets/icons/rate.svg";
import { Button } from "../Button/Button";
import { useNavigate } from "react-router-dom";

export const Card = ({ id, name, city, cuisine, photo, averageRating }) => {
  const navigate = useNavigate();
  return (
    <div className={style.container}>
      <div className={style.imgContainer}>
        <img src={`/assets/restaurants/${photo}`} alt="Restaurant photo." />
      </div>
      <div className={style.contentContainer}>
        <h3>{name}</h3>
        <div className={style.flexContainer}>
          <img src={cityIcon} alt="City icon." />
          <p>{city}</p>
        </div>
        <div className={style.flexContainer}>
          <img src={rateIcon} alt="Rate icon." />
          <p>{averageRating > 0 ? `${averageRating}/5` : "No reviews yet"}</p>
        </div>
        <div className={style.flexContainer}>
          <img src={cuisineIcon} alt="Cuisine icon." />
          <p>{cuisine.join(", ")}</p>
        </div>
      </div>
      <div className={style.buttonContainer}>
        <Button
          type="primary"
          text="View Details"
          onClick={() =>
            navigate(`/restaurants/${encodeURIComponent(name.toLowerCase())}`, {
              state: { id },
            })
          }
        />
      </div>
    </div>
  );
};
