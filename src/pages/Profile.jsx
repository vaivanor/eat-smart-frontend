import { PageWrapper } from "../components/PageWrapper/PageWrapper.jsx";
import { BackgroundWrapper } from "../components/BackgroundWrapper/BackgroundWrapper.jsx";
import bg from "../assets/background/bg-2.jpeg";
import { Button } from "../components/Button/Button.jsx";
import { GridWrapper } from "../components/GridWrapper/GridWrapper.jsx";
import { useAppContext } from "../store/AppContext.jsx";
import { InfoRow } from "../components/InfoRow/InfoRow.jsx";
import phoneIcon from "../assets/icons/phone.svg";
import emailIcon from "../assets/icons/email.svg";

export const Profile = () => {
  const { currentUser } = useAppContext();

  return (
    <PageWrapper>
      <BackgroundWrapper src={bg}>
        <div>
          <h1>Profile</h1>
        </div>
        <Button
          text="Update"
          onClick={() => navigate("/profile/edit-profile")}
        />
      </BackgroundWrapper>
      <GridWrapper>
        <div>
          <h2
            style={{ margin: "0.5rem 0 0 0" }}
          >{`${currentUser.name} ${currentUser.surname}`}</h2>
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
