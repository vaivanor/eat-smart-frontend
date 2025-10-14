import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Restaurants } from "./pages/Restaurants";
import { Restaurant } from "./pages/Restaurant";
import { SignIn } from "./pages/SignIn";
import { Profile } from "./pages/Profile";
import { Reservations } from "./pages/Reservations";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";

function App() {
  return (
    <>
      <Routes>
        <Route Component={Home} path="/" />
        <Route Component={Restaurants} path="/restaurants" />
        <Route Component={Restaurant} path="/restaurants/:restaurantName" />
        <Route Component={SignIn} path="/sign-in" />

        <Route
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
          path="/profile"
        />
        <Route
          element={
            <PrivateRoute>
              <Reservations />
            </PrivateRoute>
          }
          path="/reservations"
        />
      </Routes>
    </>
  );
}

export default App;
