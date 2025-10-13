import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Restaurants } from "./pages/Restaurants";
import { Restaurant } from "./pages/Restaurant";

function App() {
  return (
    <>
      <Routes>
        <Route Component={Home} path="/" />
        <Route Component={Restaurants} path="/restaurants" />
        <Route Component={Restaurant} path="/restaurants/:restaurantName" />
      </Routes>
    </>
  );
}

export default App;
