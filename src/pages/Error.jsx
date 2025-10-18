import { PageWrapper } from "../components/PageWrapper/PageWrapper";
import { GridWrapper } from "../components/GridWrapper/GridWrapper";

export const Error = () => {
  return (
    <PageWrapper>
      <GridWrapper columns={1} type="center">
        <h1>Page not found...</h1>
      </GridWrapper>
    </PageWrapper>
  );
};
