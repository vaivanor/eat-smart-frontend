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
import { validateCommentFields } from "../utils/validateFields.js";
import { useModal } from "../utils/useModal.js";
import { Modal } from "../components/Modal/Modal.jsx";
import { fetchData } from "../utils/fetchData.js";
import { TextArea } from "../components/TextArea/TextArea.jsx";
import { Form } from "../components/Form/Form.jsx";
import { Calendar } from "../components/Calendar/Calendar.jsx";

export const NewReservation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { restaurantId, restaurantPhoto, restaurantWorkingDays } =
    location.state;

  const [errors, setErrors] = useState({});
  const [comment, setComment] = useState("");
  const { isOpen, modalProps, showModal } = useModal();
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateCommentFields({ evaluation, comment });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    showModal({
      text: "Are you sure you want to make this reservation?",
      confirmText: "Yes",
      cancelText: "Cancel",
      onConfirm: () => {
        fetchData({
          endpoint: "/reservation",
          method: "POST",
          body: {
            evaluation,
            comment,
            restaurant_id: restaurantId,
          },
          onSuccess: (result) => {
            if (result.success) {
              showModal({
                text: "Your reservation has been created successfully!",
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
          <h1>New Reservation</h1>
        </div>
      </BackgroundWrapper>
      <Form>
        <GridWrapper columns={1}>
          <Calendar
            id="calendar"
            label="Date"
            details="(select a date within the next 3 months)"
            workingHours={restaurantWorkingDays}
            onChange={(date) => setSelectedDate(date)}
            selectedDate={selectedDate}
          />

          {/* vietu pasirinkimo nurodymas */}

          {/* tik nurodzius data ir vietu skaiciu rodomi laikai galimi, paimti is atskiro route i kuri nusiuntus grazina available times */}

          <TextArea
            id="additional"
            label="Additional"
            details="(special requests or notes)"
            type="text"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
        </GridWrapper>

        <GridWrapper columns={1} type="center">
          <div>
            <Button text="Confirm" type="primary" onClick={handleSubmit} />
          </div>
        </GridWrapper>
      </Form>
      <Modal isOpen={isOpen} {...modalProps} />
    </PageWrapper>
  );
};
