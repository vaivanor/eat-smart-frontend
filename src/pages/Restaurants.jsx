import { BackgroundWrapper } from "../components/BackgroundWrapper/BackgroundWrapper.jsx";
import { PageWrapper } from "../components/PageWrapper/PageWrapper.jsx";
import bg from "../assets/background/bg.jpeg";
import { GridWrapper } from "../components/GridWrapper/GridWrapper.jsx";

export const Restaurants = () => {
  return (
    <PageWrapper>
      <BackgroundWrapper src={bg}>
        <div>
          <h1>Restaurants</h1>
        </div>
      </BackgroundWrapper>
      <GridWrapper columns={1}>
        <h1>Restaurants</h1>
      </GridWrapper>
    </PageWrapper>
  );
};
