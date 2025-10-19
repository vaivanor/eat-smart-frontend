import bg from "../assets/background/bg-2.jpeg";
import phoneIcon from "../assets/icons/phone.svg";
import emailIcon from "../assets/icons/email.svg";
import { useNavigate } from "react-router-dom";
import { PageWrapper } from "../components/PageWrapper/PageWrapper.jsx";
import { BackgroundWrapper } from "../components/BackgroundWrapper/BackgroundWrapper.jsx";
import { Button } from "../components/Button/Button.jsx";
import { GridWrapper } from "../components/GridWrapper/GridWrapper.jsx";
import { InfoRow } from "../components/InfoRow/InfoRow.jsx";
import { Loader } from "../components/Loader/Loader.jsx";
import { useAppContext } from "../store/AppContext.jsx";

export const Profile = () => {
  const { currentUser } = useAppContext();
  const navigate = useNavigate();

  if (!currentUser) return <Loader />;

  return (
    <PageWrapper>
      <BackgroundWrapper src={bg}>
        <div>
          <h1>Profile</h1>
        </div>
        <Button text="Edit" onClick={() => navigate("/profile/edit-profile")} />
      </BackgroundWrapper>
      <GridWrapper>
        <div>
          <h2 style={{ margin: "0.5rem 0 0 0" }}>
            {`${currentUser.name} ${currentUser.surname}`}
          </h2>
        </div>
        <div>
          <InfoRow
            icon={phoneIcon}
            text={currentUser.phone}
            alt="Phone icon."
          />
          <InfoRow
            icon={emailIcon}
            text={
              <a href={`mailto:${currentUser.email}`}>{currentUser.email}</a>
            }
            alt="Email icon."
          />
        </div>
      </GridWrapper>
    </PageWrapper>
  );
};
