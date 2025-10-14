import { BackgroundWrapper } from "../components/BackgroundWrapper/BackgroundWrapper.jsx";
import { PageWrapper } from "../components/PageWrapper/PageWrapper.jsx";
import bg from "../assets/background/bg.jpeg";
import { GridWrapper } from "../components/GridWrapper/GridWrapper.jsx";
import { Loader } from "../components/Loader/Loader.jsx";
import { useState, useEffect } from "react";
import { useAppContext } from "../store/AppContext.jsx";
import { fetchData } from "../utils/fetchData.js";
import { RestaurantCard } from "../components/RestaurantCard/RestaurantCard.jsx";

export const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const { isLoading, setIsLoading } = useAppContext();
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    fetchData({
      endpoint: "/restaurants",
      method: "GET",
      setIsLoading,
      onSuccess: (result) => {
        setRestaurants(result.data);
      },
      onError: (error) => {
        console.error("Error:", error);
      },
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setColumns(window.innerWidth >= 1600 ? 2 : 1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <PageWrapper>
      <BackgroundWrapper src={bg}>
        <div>
          <h1>Restaurants</h1>
        </div>
      </BackgroundWrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <GridWrapper columns={columns}>
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant._id}
              id={restaurant._id}
              name={restaurant.name}
              city={restaurant.city}
              cuisine={restaurant.cuisine}
              photo={restaurant.photo}
              averageRating={restaurant.averageRating}
            />
          ))}
        </GridWrapper>
      )}
    </PageWrapper>
  );
};
