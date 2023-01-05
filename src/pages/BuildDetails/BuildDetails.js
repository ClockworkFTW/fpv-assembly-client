import { createContext } from "react";
import { useParams } from "react-router-dom";

// API
import { useGetBuildQuery } from "features/builds/buildsApiSlice";

// Features
import BuildDetails from "features/builds/BuildDetails";

// Styles
import * as Styled from "pages/BuildDetails/BuildDetails.style";

// Context
export const BuildContext = createContext(null);

const BuildDetailsPage = () => {
  const { buildId } = useParams();

  const { data: build, isLoading } = useGetBuildQuery(buildId);

  return isLoading ? (
    <p>Loading...</p>
  ) : build ? (
    <BuildContext.Provider
      value={{ buildId: build.id, creatorId: build.user.id }}
    >
      <Styled.Header>
        <BuildDetails.Metadata build={build} />
        <BuildDetails.ImageCarousel images={build.images} />
      </Styled.Header>
      <Styled.Container>
        <aside>
          <BuildDetails.PartsList parts={build.parts} />
        </aside>
        <main>
          <BuildDetails.BuildLog log={build.log} />
          <BuildDetails.CommentsList comments={build.comments} />
        </main>
      </Styled.Container>
    </BuildContext.Provider>
  ) : (
    <p>Build not found...</p>
  );
};

export default BuildDetailsPage;
