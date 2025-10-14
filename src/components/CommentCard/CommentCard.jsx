import style from "./CommentCard.module.scss";
import rateIcon from "../../assets/icons/rate.svg";
import { InfoRow } from "../InfoRow/InfoRow";
import { Button } from "../Button/Button";

export const CommentCard = ({ name, evaluation, comment, createdAt }) => {
  return (
    <div className={style.container}>
      <div>
        <h3>{name}</h3>
        <InfoRow icon={rateIcon} text={`${evaluation}/5`} alt="Email icon." />
        <p>{comment}</p>
        <p>
          {new Date(createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
};
