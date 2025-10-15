import style from "./CommentCard.module.scss";
import rateIcon from "../../assets/icons/rate.svg";
import { InfoRow } from "../InfoRow/InfoRow";
import { ImageButton } from "../ImageButton/ImageButton";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import { useAppContext } from "../../store/AppContext";

export const CommentCard = ({
  userId,
  commentId,
  name,
  evaluation,
  comment,
  createdAt,
  onDelete,
}) => {
  const { currentUser } = useAppContext();
  const isAuthor = currentUser?._id === userId;

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
      {isAuthor && (
        <div className={style.buttonContainer}>
          <ImageButton src={editIcon} alt="Edit icon." />
          <ImageButton
            src={deleteIcon}
            alt="Delete icon."
            onClick={() => onDelete(commentId)}
          />
        </div>
      )}
    </div>
  );
};
