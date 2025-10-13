import { BackgroundWrapper } from "../components/BackgroundWrapper/BackgroundWrapper.jsx";
import { PageWrapper } from "../components/PageWrapper/PageWrapper.jsx";
import bg from "../assets/background/bg.jpeg";
import { GridWrapper } from "../components/GridWrapper/GridWrapper.jsx";
import { Loader } from "../components/Loader/Loader.jsx";
import { useState, useEffect } from "react";
import { useAppContext } from "../store/AppContext.jsx";
import { fetchData } from "../utils/fetchData.js";

export const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const { isLoading, setIsLoading } = useAppContext();

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

  return (
    <PageWrapper>
      <BackgroundWrapper src={bg}>
        <div>
          <h1>Restaurants</h1>
        </div>
      </BackgroundWrapper>
      <GridWrapper columns={1}>
        <div>
          {isLoading ? (
            <Loader />
          ) : (
            <div>
              {restaurants.map((restaurant) => (
                <div key={restaurant._id}>
                  <h3>{restaurant.name}</h3>
                </div>
              ))}
            </div>
          )}
        </div>
      </GridWrapper>
    </PageWrapper>
  );
};
