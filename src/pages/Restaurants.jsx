import { BackgroundWrapper } from "../components/BackgroundWrapper/BackgroundWrapper.jsx";
import { PageWrapper } from "../components/PageWrapper/PageWrapper.jsx";
import bg from "../assets/background/bg.jpeg";
import { GridWrapper } from "../components/GridWrapper/GridWrapper.jsx";
import { Loader } from "../components/Loader/Loader.jsx";
import { useState, useEffect } from "react";
import { fetchData } from "../utils/fetchData.js";
import { RestaurantCard } from "../components/RestaurantCard/RestaurantCard.jsx";
import { Input } from "../components/Input/Input.jsx";

export const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchInputContent, setSearchInputContent] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    fetchData({
      endpoint: `/restaurants?sortBy=name&order=asc`,
      method: "GET",
      setIsLoading,
      onSuccess: (result) => {
        setRestaurants(result.data);
        setFilteredRestaurants(result.data);
      },
      onError: (error) => {
        showModal({
          text: error,
          confirmText: "Try again",
          onConfirm: () => {
            navigate("/");
          },
        });
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

  useEffect(() => {
    const timeout = setTimeout(() => {
      const inputValue = searchInputContent.toLowerCase().trim();

      const filtered = restaurants.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(inputValue) ||
          restaurant.city.toLowerCase().includes(inputValue) ||
          restaurant.cuisine.some((c) => c.toLowerCase().includes(inputValue))
      );

      setFilteredRestaurants(filtered);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchInputContent, restaurants]);

  return (
    <PageWrapper>
      <BackgroundWrapper src={bg}>
        <div>
          <h1>Restaurants</h1>
        </div>
      </BackgroundWrapper>
      <GridWrapper columns={1}>
        <Input
          id="search"
          label="Search"
          type="text"
          details="(by name, city or cuisine)"
          value={searchInputContent}
          onChange={(e) => setSearchInputContent(e.target.value)}
        />
      </GridWrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <GridWrapper columns={columns}>
          {filteredRestaurants.length === 0 ? (
            <p style={{ marginTop: "0" }}>No results...</p>
          ) : (
            filteredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant._id}
                id={restaurant._id}
                name={restaurant.name}
                city={restaurant.city}
                cuisine={restaurant.cuisine}
                photo={restaurant.photo}
                averageRating={restaurant.averageRating}
              />
            ))
          )}
        </GridWrapper>
      )}
    </PageWrapper>
  );
};
