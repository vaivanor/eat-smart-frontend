import style from "./RestaurantCard.module.scss";
import cityIcon from "../../assets/icons/city.svg";
import cuisineIcon from "../../assets/icons/cuisine.svg";
import rateIcon from "../../assets/icons/rate.svg";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button/Button";
import { InfoRow } from "../InfoRow/InfoRow";

export const RestaurantCard = ({
  id,
  name,
  city,
  cuisine,
  photo,
  averageRating,
}) => {
  const navigate = useNavigate();
  return (
    <div className={style.container}>
      <div className={style.imgContainer}>
        <img src={`/assets/restaurants/${photo}`} alt="Restaurant photo." />
      </div>
      <div className={style.contentContainer}>
        <h3>{name}</h3>
        <InfoRow icon={cityIcon} text={city} alt="City icon." />
        <InfoRow
          icon={rateIcon}
          text={averageRating > 0 ? `${averageRating}/5` : "No reviews yet"}
          alt="Rate icon."
        />
        <InfoRow
          icon={cuisineIcon}
          text={cuisine.join(", ")}
          alt="Cuisine icon."
        />
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
