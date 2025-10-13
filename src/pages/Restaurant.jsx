import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchData } from "../utils/fetchData.js";
import { Loader } from "../components/Loader/Loader.jsx";
import { PageWrapper } from "../components/PageWrapper/PageWrapper.jsx";
import { BackgroundWrapper } from "../components/BackgroundWrapper/BackgroundWrapper.jsx";
import { Button } from "../components/Button/Button.jsx";
import { GridWrapper } from "../components/GridWrapper/GridWrapper.jsx";

export const Restaurant = () => {
  const location = useLocation();
  const restaurantId = location.state?.id;

  const [restaurant, setRestaurant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData({
      endpoint: `/restaurant/${restaurantId}`,
      method: "GET",
      setIsLoading,
      onSuccess: (result) => {
        setRestaurant(result.data);
      },
      onError: (error) => {
        console.error("Error:", error);
        setIsLoading(false);
      },
    });
  }, [restaurantId]);

  return (
    <PageWrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <BackgroundWrapper src={`/assets/restaurants/${restaurant.photo}`}>
            <div>
              <h1>{restaurant.name}</h1>
              <p>{restaurant.description}</p>
            </div>
            <div>
              <Button
                type="primary"
                text="Reserve"
                onClick={() =>
                  navigate(`/restaurant/${restaurantId}/reservation`)
                }
              />
            </div>
          </BackgroundWrapper>
          <GridWrapper></GridWrapper>
        </>
      )}
    </PageWrapper>
  );
};
