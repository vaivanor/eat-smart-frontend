import { PageWrapper } from "../components/PageWrapper/PageWrapper.jsx";
import { BackgroundWrapper } from "../components/BackgroundWrapper/BackgroundWrapper.jsx";
import { GridWrapper } from "../components/GridWrapper/GridWrapper.jsx";
import { ImageButton } from "../components/ImageButton/ImageButton.jsx";
import backArrow from "../assets/icons/arrow.svg";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Button } from "../components/Button/Button.jsx";
import { Input } from "../components/Input/Input.jsx";
import { useState, useEffect } from "react";
import { validateReservationFields } from "../utils/validateFields.js";
import { useModal } from "../utils/useModal.js";
import { Modal } from "../components/Modal/Modal.jsx";
import { fetchData } from "../utils/fetchData.js";
import { TextArea } from "../components/TextArea/TextArea.jsx";
import { Form } from "../components/Form/Form.jsx";
import { DatePicker } from "../components/DatePicker/DatePicker.jsx";
import { TimePicker } from "../components/TimePicker/TimePicker.jsx";

export const NewReservation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { restaurantId, restaurantPhoto, restaurantWorkingDays } =
    location.state;

  const [errors, setErrors] = useState({});
  const [availableTimes, setAvailableTimes] = useState([]);

  const { isOpen, modalProps, showModal } = useModal();

  const [date, setDate] = useState(new Date());
  const [comment, setComment] = useState("");
  const [seats, setSeats] = useState("");
  const [time, setTime] = useState("");

  const formatDate = (dateObj) => {
    return dateObj.toISOString().split("T")[0];
  };

  useEffect(() => {
    if (!date || !seats || !restaurantId) {
      setAvailableTimes([]);
      setTime("");
      return;
    }

    const formattedDate = formatDate(date);

    fetchData({
      endpoint: `/restaurant/${restaurantId}/available-times?date=${formattedDate}&seats=${seats}`,
      method: "GET",
      onSuccess: (result) => {
        if (result.success) {
          setAvailableTimes(result.data);
          if (result.data.length > 0) {
            setTime(result.data[0]);
          }
        } else {
          showModal({
            text: result.message || "Could not fetch available times.",
            confirmText: "Try Again",
          });
        }
      },
      onError: (error) => {
        showModal({
          text: error || "Unexpected error occurred.",
          confirmText: "Try Again",
        });
      },
      requireAuth: true,
      navigate,
    });
  }, [date, seats, restaurantId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateReservationFields({
      time,
      seats,
      date,
    });
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
        const formattedDate = formatDate(date);
        fetchData({
          endpoint: "/reservation",
          method: "POST",
          body: {
            restaurant_id: restaurantId,
            seats,
            date: formattedDate,
            from: time,
            additional: comment,
          },
          onSuccess: (result) => {
            if (result.success) {
              showModal({
                text: "Your reservation has been created successfully!",
                confirmText: "Ok",
                onConfirm: () => navigate("/reservations"),
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
          <DatePicker
            id="date"
            label="Date"
            workingHours={restaurantWorkingDays}
            onChange={(selectedDate) => {
              setDate(selectedDate);
              if (errors.date) {
                setErrors((prev) => ({ ...prev, date: "" }));
              }
            }}
            selectedDate={date}
            error={errors.date}
          />
          <Input
            id="seats"
            label="Number of People"
            type="number"
            value={seats}
            onChange={(e) => {
              const value = e.target.value;
              setSeats(value === "" ? "" : Number(value));
              if (errors.seats) {
                setErrors((prev) => ({ ...prev, seats: "" }));
              }
            }}
            error={errors.seats}
          />
          <TimePicker
            id="time"
            label="Time"
            times={availableTimes}
            selectedTime={time}
            onChange={(e) => {
              setTime(e.target.value);
              if (errors.time) {
                setErrors((prev) => ({ ...prev, time: "" }));
              }
            }}
            error={errors.time}
            hasSelection={Boolean(date && seats)}
          />

          <TextArea
            id="additional"
            label="Additional Comments"
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
