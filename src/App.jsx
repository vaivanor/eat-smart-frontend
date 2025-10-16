import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Restaurants } from "./pages/Restaurants";
import { Restaurant } from "./pages/Restaurant";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Profile } from "./pages/Profile";
import { Reservations } from "./pages/Reservations";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { EditComment } from "./pages/EditComment";

function App() {
  return (
    <>
      <Routes>
        <Route Component={Home} path="/" />
        <Route Component={Restaurants} path="/restaurants" />
        <Route Component={Restaurant} path="/restaurants/:restaurantName" />

        <Route Component={SignIn} path="/sign-in" />
        <Route Component={SignUp} path="/sign-up" />

        <Route
          element={
            <PrivateRoute>
              <EditComment />
            </PrivateRoute>
          }
          path="/restaurants/:restaurantName/edit-comment"
        />
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
