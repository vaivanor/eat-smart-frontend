import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../utils/fetchData.js";
import { Loader } from "../components/Loader/Loader.jsx";
import { PageWrapper } from "../components/PageWrapper/PageWrapper.jsx";
import { BackgroundWrapper } from "../components/BackgroundWrapper/BackgroundWrapper.jsx";
import { GridWrapper } from "../components/GridWrapper/GridWrapper.jsx";
import { InfoRow } from "../components/InfoRow/InfoRow.jsx";
import cityIcon from "../assets/icons/city-light.svg";
import cuisineIcon from "../assets/icons/cuisine-light.svg";
import rateIcon from "../assets/icons/rate-light.svg";
import calendarIcon from "../assets/icons/calendar.svg";
import mapIcon from "../assets/icons/map.svg";
import phoneIcon from "../assets/icons/phone.svg";
import emailIcon from "../assets/icons/email.svg";
import linkIcon from "../assets/icons/link.svg";
import backArrow from "../assets/icons/arrow.svg";
import { ImageButton } from "../components/ImageButton/ImageButton.jsx";
import { CommentCard } from "../components/CommentCard/CommentCard.jsx";
import { useAppContext } from "../store/AppContext.jsx";
import { Button } from "../components/Button/Button.jsx";

export const Restaurant = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const restaurantId = location.state?.id;

  const [restaurant, setRestaurant] = useState(null);
  const [comments, setComments] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [columns, setColumns] = useState(1);
  const { isLoggedIn } = useAppContext();

  useEffect(() => {
    const fetchRestaurantAndComments = async () => {
      try {
        setIsLoading(true);

        const restaurant = await fetchData({
          endpoint: `/restaurant/${restaurantId}`,
          method: "GET",
        });

        const comments = await fetchData({
          endpoint: `/restaurant/${restaurantId}/comments`,
          method: "GET",
        });

        setRestaurant(restaurant.data);
        setComments(comments.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (restaurantId) {
      fetchRestaurantAndComments();
    }
  }, [restaurantId]);

  useEffect(() => {
    const handleResize = () => {
      setColumns(window.innerWidth >= 768 ? 2 : 1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <PageWrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <GridWrapper>
            <ImageButton
              src={backArrow}
              alt="Back arrow icon."
              onClick={() => navigate("/restaurants")}
            />
          </GridWrapper>
          <BackgroundWrapper src={`/assets/restaurants/${restaurant.photo}`}>
            <div>
              <h1>{restaurant.name}</h1>
              <p>{restaurant.description}</p>
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <InfoRow
                icon={cityIcon}
                text={restaurant.city}
                alt="City icon."
              />
              <InfoRow
                icon={rateIcon}
                text={
                  restaurant.averageRating > 0
                    ? `${restaurant.averageRating}/5`
                    : "No reviews yet"
                }
                alt="Rate icon."
              />
              <InfoRow
                icon={cuisineIcon}
                text={restaurant.cuisine.join(", ")}
                alt="Cuisine icon."
              />
            </div>
            {isLoggedIn && (
              <>
                <Button
                  type="primary"
                  text="Reserve"
                  onClick={() => navigate("/reserve")}
                ></Button>
                <Button
                  type="secondary"
                  text="Leave a Comment"
                  onClick={() => navigate("/comment")}
                ></Button>
              </>
            )}
          </BackgroundWrapper>

          <GridWrapper columns={columns}>
            <div>
              <InfoRow
                icon={calendarIcon}
                text="Opening hours:"
                alt="Calendar icon."
              />
              <div>
                {Object.entries(restaurant.workingHours).map(([day, hours]) => (
                  <p key={day}>
                    <b>{day}</b>: {hours.from} - {hours.to}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <InfoRow
                icon={mapIcon}
                text={restaurant.address}
                alt="Adress icon."
              />
              <InfoRow
                icon={linkIcon}
                text={<a href={restaurant.link}>{restaurant.link}</a>}
                alt="Website link icon."
              />
              <InfoRow
                icon={phoneIcon}
                text={restaurant.phone}
                alt="Phone icon."
              />
              <InfoRow
                icon={emailIcon}
                text={<a href={restaurant.email}>{restaurant.email}</a>}
                alt="Email icon."
              />
            </div>
          </GridWrapper>

          <GridWrapper columns={1}>
            <h2>Comments</h2>
            {comments && comments.length > 0 ? (
              comments.map((comment) => (
                <CommentCard
                  key={comment._id}
                  name={comment.user[0].name}
                  evaluation={comment.evaluation}
                  comment={comment.comment}
                  createdAt={comment.createdAt}
                />
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </GridWrapper>
        </>
      )}
    </PageWrapper>
  );
};
