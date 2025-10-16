import { PageWrapper } from "../components/PageWrapper/PageWrapper.jsx";
import { BackgroundWrapper } from "../components/BackgroundWrapper/BackgroundWrapper.jsx";
import { GridWrapper } from "../components/GridWrapper/GridWrapper.jsx";
import { ImageButton } from "../components/ImageButton/ImageButton.jsx";
import backArrow from "../assets/icons/arrow.svg";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Button } from "../components/Button/Button.jsx";
import { Input } from "../components/Input/Input.jsx";

export const EditComment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, evaluation, commentText, restaurantPhoto } = location.state;
  return (
    <PageWrapper>
      <GridWrapper>
        <ImageButton
          src={backArrow}
          alt="Back arrow icon."
          onClick={() => navigate(-1)}
        />
      </GridWrapper>
      <BackgroundWrapper src={`/assets/restaurants/${restaurantPhoto}`}>
        <div>
          <h1>Edit Comment</h1>
        </div>
      </BackgroundWrapper>
      <GridWrapper columns={1}>
        <Input
          id="evaluation"
          label="Evaluation"
          type="number"
          value={evaluation}
        />
      </GridWrapper>

      <GridWrapper columns={1} type="center">
        <div>
          <Button text="Confirm" type="primary" />
        </div>
      </GridWrapper>
    </PageWrapper>
  );
};
