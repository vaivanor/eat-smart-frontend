import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Restaurants } from "./pages/Restaurants";
import { Restaurant } from "./pages/Restaurant";
import { SignIn } from "./pages/SignIn";
import { Profile } from "./pages/Profile";
import { Reservations } from "./pages/Reservations";

function App() {
  return (
    <>
      <Routes>
        <Route Component={Home} path="/" />

        <Route Component={Profile} path="/profile" />
        <Route Component={Reservations} path="/reservations" />

        <Route Component={Restaurants} path="/restaurants" />
        <Route Component={Restaurant} path="/restaurants/:restaurantName" />

        <Route Component={SignIn} path="/sign-in" />
      </Routes>
    </>
  );
}

export default App;
