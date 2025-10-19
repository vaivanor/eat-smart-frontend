import landingBg from "../assets/background/landing-bg.jpeg";
import bg from "../assets/background/bg.jpeg";
import clock from "../assets/icons/clock.svg";
import person from "../assets/icons/person.svg";
import mobile from "../assets/icons/mobile.svg";
import { useNavigate } from "react-router-dom";
import { BackgroundWrapper } from "../components/BackgroundWrapper/BackgroundWrapper.jsx";
import { PageWrapper } from "../components/PageWrapper/PageWrapper.jsx";
import { Button } from "../components/Button/Button.jsx";
import { GridWrapper } from "../components/GridWrapper/GridWrapper.jsx";
import { useAppContext } from "../store/AppContext.jsx";

export const Home = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAppContext();
  return (
    <PageWrapper>
      <BackgroundWrapper src={landingBg}>
        <div>
          <h1>Smart dining starts here</h1>
          <p>
            EatSmart helps you book a table in the finest restaurants and share
            experience with others? Join the smart dining revolution!
          </p>
        </div>
        <Button
          type="secondary"
          text="Explore Restaurants"
          onClick={() => navigate("/restaurants")}
        />
        {!isLoggedIn && (
          <Button
            type="primary"
            text="Sign In"
            onClick={() => navigate("/sign-in")}
          />
        )}
      </BackgroundWrapper>
      <GridWrapper columns={3} type="center" typeTheme="light">
        <div>
          <img src={clock} style={{ paddingTop: "1rem" }} alt="Clock icon." />
          <h2>Quick Reservations</h2>
          <p>Book your table instantly - no calls, no waiting.</p>
        </div>
        <div>
          <img src={person} style={{ paddingTop: "1rem" }} alt="Person icon." />
          <h2>Personal Dashboard</h2>
          <p>Manage your bookings and profile in one place.</p>
        </div>
        <div>
          <img src={mobile} style={{ paddingTop: "1rem" }} alt="Mobile icon." />
          <h2>Mobile-Friendly</h2>
          <p>
            Enjoy a smooth experience on any device - phone, tablet or desktop.
          </p>
        </div>
      </GridWrapper>

      <GridWrapper columns={1} type="center" typeTheme="dark">
        <h2>How it Works?</h2>
        <div>
          <h3>Find a Restaurant</h3>
          <p>
            Browse a curated list of restaurants based on your location and
            preferences. Discover places by cuisine, rating.
          </p>
        </div>
        <div>
          <h3>Sign In to Reserve</h3>
          <p>
            To book a table, you need to sign in. This ensures your reservations
            are saved and manageable.
          </p>
        </div>
        <div>
          <h3>Manage Your Visit</h3>
          <p>
            Access your personal dashboard to view, cancel, or update
            reservations.
          </p>
        </div>
      </GridWrapper>

      <BackgroundWrapper src={bg}>
        {!isLoggedIn && (
          <>
            <div>
              <h2>Not a member yet?</h2>
              <p>Sign Up now and start reserving smarter.</p>
            </div>
            <div>
              <Button
                type="primary"
                text="Sign Up"
                onClick={() => navigate("/sign-up")}
              />
            </div>
          </>
        )}
      </BackgroundWrapper>
    </PageWrapper>
  );
};
