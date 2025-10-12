import { BackgroundWrapper } from "../components/BackgroundWrapper/BackgroundWrapper.jsx";
import { PageWrapper } from "../components/PageWrapper/PageWrapper.jsx";
import landingBg from "../assets/background/landing-bg.jpeg";
import bg from "../assets/background/bg.jpeg";
import clock from "../assets/icons/clock.svg";
import person from "../assets/icons/person.svg";
import mobile from "../assets/icons/mobile.svg";
import { Button } from "../components/Button/Button.jsx";
import { useNavigate } from "react-router-dom";
import { GridWrapper } from "../components/GridWrapper/GridWrapper.jsx";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <PageWrapper>
      <BackgroundWrapper src={landingBg}>
        <div>
          <h1>Smart dining starts here.</h1>
          <p>
            EatSmart helps you find the best restaurants, book your table in
            seconds, and share your experience with others. Join the smart
            dining revolution!
          </p>
        </div>
        <Button
          type="secondary"
          text="Explore Restaurants"
          onClick={() => navigate("/restaurants")}
        />
      </BackgroundWrapper>
      <GridWrapper columns={3} type="center" typeTheme="light">
        <div>
          <img src={clock} alt="Clock icon." />
          <h2>Quick Reservations</h2>
          <p>Book your table instantly - no calls, no waiting.</p>
        </div>
        <div>
          <img src={person} alt="Person icon." />
          <h2>Personal Dashboard</h2>
          <p>Manage your bookings and profile in one place.</p>
        </div>
        <div>
          <img src={mobile} alt="Mobile icon." />
          <h2>Mobile-Friendly</h2>
          <p>
            Enjoy a smooth experience on any device - phone, tablet or desktop.
          </p>
        </div>
      </GridWrapper>

      <GridWrapper columns={1} type="center" typeTheme="dark">
        <div>
          <h2>Find a Restaurant</h2>
          <p>
            Browse a curated list of restaurants based on your location and
            preferences. Discover places by cuisine, rating, or availability.
          </p>
        </div>
        <div>
          <h2>Sign In to Reserve</h2>
          <p>
            To book a table, you need to sign in. This ensures your reservations
            are saved and manageable. Once signed in, choose your date and time,
            and reserve instantly.
          </p>
        </div>
        <div>
          <h2>Manage Your Visit</h2>
          <p>
            Access your personal dashboard to view, cancel, or update
            reservations. You can also edit your profile and use EatSmart
            seamlessly on mobile devices.
          </p>
        </div>
      </GridWrapper>

      <BackgroundWrapper src={bg}>
        <div>
          <h2>Not a member yet?</h2>
          <p>Sign Up now and start reserving smarter.</p>
        </div>
        <div>
          <Button
            type="primary"
            text="Sign Up"
            onClick={() => navigate("/sing-up")}
          />
        </div>
      </BackgroundWrapper>
    </PageWrapper>
  );
};
