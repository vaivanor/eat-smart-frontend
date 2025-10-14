import { PageWrapper } from "../components/PageWrapper/PageWrapper.jsx";
import { BackgroundWrapper } from "../components/BackgroundWrapper/BackgroundWrapper.jsx";
import bg from "../assets/background/bg.jpeg";

export const Profile = () => {
  return (
    <PageWrapper>
      <BackgroundWrapper src={bg}>
        <div>
          <h1>Profile</h1>
        </div>
      </BackgroundWrapper>
    </PageWrapper>
  );
};
