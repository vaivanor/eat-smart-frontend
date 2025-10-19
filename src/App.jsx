import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { EditProfile } from "./pages/EditProfile";
import { Restaurants } from "./pages/Restaurants";
import { Restaurant } from "./pages/Restaurant";
import { Reservations } from "./pages/Reservations";
import { NewReservation } from "./pages/NewReservation";
import { EditReservation } from "./pages/EditReservation";
import { NewComment } from "./pages/NewComment";
import { EditComment } from "./pages/EditComment";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { Error } from "./pages/Error";

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
              <NewComment />
            </PrivateRoute>
          }
          path="/restaurants/:restaurantName/new-comment"
        />
        <Route
          element={
            <PrivateRoute>
              <NewReservation />
            </PrivateRoute>
          }
          path="/restaurants/:restaurantName/new-reservation"
        />
        <Route
          element={
            <PrivateRoute>
              <Reservations />
            </PrivateRoute>
          }
          path="/reservations"
        />
        <Route
          element={
            <PrivateRoute>
              <EditReservation />
            </PrivateRoute>
          }
          path="/reservations/edit-reservation"
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
              <EditProfile />
            </PrivateRoute>
          }
          path="/profile/edit-profile"
        />
        <Route Component={Error} path="/*" />
      </Routes>
    </>
  );
}

export default App;
