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

export const Reservations = () => {
  const { currentUser } = useAppContext();
  const reservations = currentUser?.reservations || [];
  return (
    <PageWrapper>
      <BackgroundWrapper src={bg}>
        <div>
          <h1>Reservations</h1>
        </div>
      </BackgroundWrapper>
      <GridWrapper columns={1}>
        {reservations && reservations.length > 0 ? (
          reservations.map((reservation) => (
            <ItemCard
              userId={currentUser._id}
              id={reservation._id}
              key={reservation._id}
              onEdit={() => {}}
              onDelete={() => {}}
            >
              <h3>{reservation.restaurant.name}</h3>
              <InfoRow
                icon={mapIcon}
                text={reservation.restaurant.address}
                alt="Adress icon."
              />
              <InfoRow
                icon={calendarIcon}
                text={new Date(reservation.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
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
                text={reservation.additional}
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
        ) : (
          <p>No reservations yet.</p>
        )}
      </GridWrapper>
      <GridWrapper>
        <h2>History</h2>
      </GridWrapper>
    </PageWrapper>
  );
};
