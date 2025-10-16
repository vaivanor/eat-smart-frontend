import { PageWrapper } from "../components/PageWrapper/PageWrapper.jsx";
import { BackgroundWrapper } from "../components/BackgroundWrapper/BackgroundWrapper.jsx";
import { GridWrapper } from "../components/GridWrapper/GridWrapper.jsx";
import { ImageButton } from "../components/ImageButton/ImageButton.jsx";
import backArrow from "../assets/icons/arrow.svg";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Button } from "../components/Button/Button.jsx";
import { Input } from "../components/Input/Input.jsx";
import { useState } from "react";
import { validateFields } from "../utils/validateFields.js";
import { useModal } from "../utils/useModal.js";
import { Modal } from "../components/Modal/Modal.jsx";
import { fetchData } from "../utils/fetchData.js";
import { TextArea } from "../components/TextArea/TextArea.jsx";

export const EditComment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, evaluation, comment, restaurantPhoto } = location.state;
  const [errors, setErrors] = useState({});
  const [evaluationUpdate, setEvaluationUpdate] = useState(evaluation || "");
  const [commentUpdate, setCommentUpdate] = useState(comment || "");
  const { isOpen, modalProps, showModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateFields({
      evaluation: evaluationUpdate,
      comment: commentUpdate,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    showModal({
      text: "Are you sure you want to update the comment?",
      confirmText: "Yes",
      cancelText: "Cancel",
      onConfirm: () => {
        fetchData({
          endpoint: `/comment/${id}`,
          method: "PUT",
          body: {
            evaluation: evaluationUpdate,
            comment: commentUpdate,
          },
          onSuccess: (result) => {
            if (result.success) {
              showModal({
                text: "Comment successfully updated!",
                confirmText: "Ok",
                onConfirm: () => navigate(-1),
              });
            } else {
              showModal({
                text: result.message || "Something went wrong.",
                confirmText: "Try Again",
              });
            }
          },
          onError: (error) => {
            showModal({
              text: error.message || "Unexpected error occurred.",
              confirmText: "Try Again",
            });
          },
        });
      },
      onCancel: () => {},
    });
  };

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
          id="evaluationUpdate"
          label="Evaluation"
          details="(1-5)"
          type="number"
          value={evaluationUpdate}
          onChange={(e) => {
            setEvaluationUpdate(e.target.value);
            if (errors.evaluation) {
              setErrors((prev) => ({ ...prev, evaluation: "" }));
            }
          }}
          error={errors.evaluation}
        />
        <TextArea
          id="commentUpdate"
          label="Comment"
          type="text"
          value={commentUpdate}
          onChange={(e) => {
            setCommentUpdate(e.target.value);
          }}
        />
      </GridWrapper>

      <GridWrapper columns={1} type="center">
        <div>
          <Button text="Confirm" type="primary" onClick={handleSubmit} />
        </div>
      </GridWrapper>
      <Modal isOpen={isOpen} {...modalProps} />
    </PageWrapper>
  );
};
