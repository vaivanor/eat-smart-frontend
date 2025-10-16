import { PageWrapper } from "../components/PageWrapper/PageWrapper.jsx";
import { BackgroundWrapper } from "../components/BackgroundWrapper/BackgroundWrapper.jsx";
import bg from "../assets/background/bg-2.jpeg";

export const Reservations = () => {
  return (
    <PageWrapper>
      <BackgroundWrapper src={bg}>
        <div>
          <h1>Reservations</h1>
        </div>
      </BackgroundWrapper>
    </PageWrapper>
  );
};
