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
import { Error } from "./Error.jsx";
import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs.jsx";

export const EditReservation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  if (!location.state) {
    return (
      <Error message="Reservation data not found. Please access this page from your reservations list." />
    );
  }

  const {
    id,
    date,
    time,
    seats,
    comment,
    restaurantId,
    restaurantName,
    restaurantPhoto,
    restaurantWorkingDays,
  } = location.state;

  const [errors, setErrors] = useState({});
  const [availableTimes, setAvailableTimes] = useState([]);

  const { isOpen, modalProps, showModal } = useModal();

  const [dateUpdate, setDateUpdate] = useState(
    date ? new Date(date) : new Date()
  );
  const [commentUpdate, setCommentUpdate] = useState(comment || "");
  const [seatsUpdate, setSeatsUpdate] = useState(seats || "");
  const [timeUpdate, setTimeUpdate] = useState(time || "");

  const formatDate = (dateObj) => dateObj.toISOString().split("T")[0];

  useEffect(() => {
    if (!dateUpdate || !seatsUpdate || !restaurantId) {
      setAvailableTimes([]);
      setTimeUpdate("");
      return;
    }

    const formattedDate = formatDate(dateUpdate);

    fetchData({
      endpoint: `/restaurant/${restaurantId}/available-times?date=${formattedDate}&seats=${seatsUpdate}`,
      method: "GET",
      onSuccess: (result) => {
        if (result.success) {
          setAvailableTimes(result.data);

          if (result.data.includes(timeUpdate)) {
            setTimeUpdate(timeUpdate);
          } else if (result.data.length > 0) {
            setTimeUpdate(result.data[0]);
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
  }, [dateUpdate, seatsUpdate, restaurantId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateReservationFields({
      time: timeUpdate,
      seats: seatsUpdate,
      date: dateUpdate,
    });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    showModal({
      text: "Are you sure you want to update this reservation?",
      confirmText: "Yes",
      cancelText: "Cancel",
      onConfirm: () => {
        const formattedDate = formatDate(dateUpdate);
        fetchData({
          endpoint: `/reservation/${id}`,
          method: "PUT",
          body: {
            seats: seatsUpdate,
            date: formattedDate,
            from: timeUpdate,
            additional: commentUpdate,
          },
          requireAuth: true,
          onSuccess: (result) => {
            if (result.success) {
              showModal({
                text: "Your reservation has been updated successfully!",
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
          <h1>Edit Reservation</h1>
          <Breadcrumbs
            items={["Reservations", `${restaurantName}`, "Edit Reservation"]}
          />
        </div>
      </BackgroundWrapper>
      <Form>
        <GridWrapper columns={1}>
          <DatePicker
            id="date"
            label="Date"
            workingHours={restaurantWorkingDays}
            onChange={(selectedDate) => {
              setDateUpdate(selectedDate);
              if (errors.date) {
                setErrors((prev) => ({ ...prev, date: "" }));
              }
            }}
            selectedDate={dateUpdate}
            error={errors.date}
          />
          <Input
            id="seats"
            label="Number of People"
            type="number"
            value={seatsUpdate}
            onChange={(e) => {
              const value = e.target.value;
              setSeatsUpdate(value === "" ? "" : Number(value));
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
            selectedTime={timeUpdate}
            onChange={(e) => {
              setTimeUpdate(e.target.value);
              if (errors.time) {
                setErrors((prev) => ({ ...prev, time: "" }));
              }
            }}
            error={errors.time}
            hasSelection={Boolean(dateUpdate && seatsUpdate)}
          />
          <TextArea
            id="additional"
            label="Additional Comments"
            type="text"
            value={commentUpdate}
            onChange={(e) => setCommentUpdate(e.target.value)}
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
