import style from "./ItemCard.module.scss";
import { ImageButton } from "../ImageButton/ImageButton";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import { useAppContext } from "../../store/AppContext";

export const ItemCard = ({ userId, id, children, onEdit, onDelete }) => {
  const { currentUser } = useAppContext();
  const isAuthor = currentUser?._id === userId;

  return (
    <div className={style.container}>
      <div>{children}</div>
      {isAuthor && (
        <div className={style.buttonContainer}>
          <ImageButton src={editIcon} alt="Edit icon." onClick={onEdit} />
          <ImageButton
            src={deleteIcon}
            alt="Delete icon."
            onClick={() => onDelete(id)}
          />
        </div>
      )}
    </div>
  );
};
