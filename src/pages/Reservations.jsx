import { PageWrapper } from "../components/PageWrapper/PageWrapper.jsx";
import { BackgroundWrapper } from "../components/BackgroundWrapper/BackgroundWrapper.jsx";
import bg from "../assets/background/bg-2.jpeg";
import { useAppContext } from "../store/AppContext.jsx";
import { GridWrapper } from "../components/GridWrapper/GridWrapper.jsx";
import { ItemCard } from "../components/ItemCard/ItemCard.jsx";
import mapIcon from "../assets/icons/map.svg";
import calendarIcon from "../assets/icons/calendar.svg";
import clockIcon from "../assets/icons/clock.svg";
import personIcon from "../assets/icons/person.svg";
import pinIcon from "../assets/icons/pin.svg";
import { InfoRow } from "../components/InfoRow/InfoRow.jsx";
import { useState, useEffect } from "react";
import { fetchData } from "../utils/fetchData.js";
import { Modal } from "../components/Modal/Modal.jsx";
import { useModal } from "../utils/useModal.js";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components/Loader/Loader.jsx";
import { Input } from "../components/Input/Input.jsx";

export const Reservations = () => {
  const { currentUser } = useAppContext();
  const [reservations, setReservations] = useState([]);
  const [searchInputContent, setSearchInputContent] = useState("");
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, modalProps, showModal } = useModal();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData({
      endpoint: "/profile/reservations",
      method: "GET",
      setIsLoading,
      requireAuth: true,
      onSuccess: (result) => {
        const now = new Date();
        const validReservations = result.data.filter((reservation) => {
          const reservationEnd = new Date(reservation.date);
          const [endHour, endMinute] = reservation.to.split(":");
          reservationEnd.setHours(endHour, endMinute, 0, 0);
          return reservationEnd >= now;
        });

        setReservations(validReservations);
        setFilteredReservations(validReservations);
      },
      onError: (error) => {
        showModal({
          text: error,
          confirmText: "Try again",
          onConfirm: () => {
            navigate("/reservations");
          },
        });
      },
    });
  }, []);

  const handleDeleteReservation = (reservationId) => {
    showModal({
      text: "Are you sure you want to delete this reservation?",
      confirmText: "Yes",
      cancelText: "Cancel",
      onConfirm: () => {
        fetchData({
          endpoint: `/reservation/${reservationId}`,
          method: "DELETE",
          requireAuth: true,
          onSuccess: (result) => {
            if (result.success) {
              showModal({
                text: "Reservation successfully deleted!",
                confirmText: "Ok",
                onConfirm: () => {
                  setReservations((prev) =>
                    prev.filter((r) => r._id !== reservationId)
                  );
                },
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

  const handleEditReservation = (reservation) => {
    navigate("/reservations/edit-reservation", {
      state: {
        id: reservation._id,
        date: reservation.date,
        time: reservation.from,
        seats: reservation.seats,
        comment: reservation.additional,
        restaurantId: reservation.restaurant_id,
        restaurantName: reservation.restaurant.name,
        restaurantPhoto: reservation.restaurant.photo,
        restaurantWorkingDays: reservation.restaurant.workingHours,
      },
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      const inputValue = searchInputContent.toLowerCase().trim();
      const now = new Date();

      const filtered = reservations.filter(
        (reservation) =>
          reservation.restaurant.name.toLowerCase().includes(inputValue) ||
          reservation.restaurant.address.toLowerCase().includes(inputValue)
      );

      setFilteredReservations(filtered);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchInputContent, reservations]);

  return (
    <PageWrapper>
      <BackgroundWrapper src={bg}>
        <div>
          <h1>Reservations</h1>
        </div>
      </BackgroundWrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <GridWrapper columns={1}>
            <Input
              id="search"
              label="Search"
              details="(by name or address)"
              type="text"
              value={searchInputContent}
              onChange={(e) => setSearchInputContent(e.target.value)}
            />
          </GridWrapper>

          <GridWrapper columns={1}>
            {reservations.length === 0 ? (
              <p style={{ marginTop: "0" }}>No reservations yet.</p>
            ) : filteredReservations.length === 0 ? (
              <p style={{ marginTop: "0" }}>No results found.</p>
            ) : (
              filteredReservations.map((reservation) => (
                <ItemCard
                  userId={currentUser._id}
                  id={reservation._id}
                  key={reservation._id}
                  onEdit={() => {
                    handleEditReservation(reservation);
                  }}
                  onDelete={handleDeleteReservation}
                >
                  <h3>{reservation.restaurant.name}</h3>
                  <InfoRow
                    icon={mapIcon}
                    text={reservation.restaurant.address}
                    alt="Address icon."
                  />
                  <InfoRow
                    icon={calendarIcon}
                    text={new Date(reservation.date).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                    alt="Calendar icon."
                  />
                  <InfoRow
                    icon={clockIcon}
                    text={`${reservation.from}-${reservation.to}`}
                    alt="Clock icon."
                  />
                  <InfoRow
                    icon={personIcon}
                    text={reservation.seats}
                    alt="Person icon."
                  />
                  <InfoRow
                    icon={pinIcon}
                    text={reservation.additional || "-"}
                    alt="Pin icon."
                  />
                  <p>
                    {reservation.updatedAt
                      ? `Updated: ${new Date(
                          reservation.updatedAt
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}`
                      : `Created: ${new Date(
                          reservation.createdAt
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}`}
                  </p>
                </ItemCard>
              ))
            )}
          </GridWrapper>
        </>
      )}
      <Modal isOpen={isOpen} {...modalProps} />
    </PageWrapper>
  );
};
