import { PageWrapper } from "../components/PageWrapper/PageWrapper.jsx";
import { GridWrapper } from "../components/GridWrapper/GridWrapper.jsx";

export const Error = ({ message }) => {
  return (
    <PageWrapper>
      <GridWrapper columns={1} type="center">
        <div>
          <h1>Page not found...</h1>
          <p>{message}</p>
        </div>
      </GridWrapper>
    </PageWrapper>
  );
};
