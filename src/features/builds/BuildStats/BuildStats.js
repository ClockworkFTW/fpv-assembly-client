import { Link } from "react-router-dom";

// API
import { useGetBuildQuery } from "../buildsApiSlice";

// Components
import Counter from "../../../components/Counter";

// Hooks
import useActiveBuildId from "../../../hooks/useActiveBuildId";

// Styles
import * as Styled from "features/builds/BuildStats/BuildStats.style";

const BuildStats = () => {
  const buildId = useActiveBuildId();

  const { data: build } = useGetBuildQuery(buildId, { skip: !buildId });

  if (!build) return;

  const count = build.parts.reduce((t, p) => t + p.quantity, 0);
  const price = build.parts.reduce((t, p) => t + p.price * p.quantity, 0);
  const weight = build.parts.reduce((t, p) => t + p.weight * p.quantity, 0);

  return (
    <Link to={`/builds/edit/${build.id}`}>
      <Styled.Container>
        <h2>{build.name || "Build Name"}</h2>
        <Styled.Grid>
          <div>
            Parts: <Counter value={count} />
          </div>
          <div>
            Cost: $<Counter value={price} />
          </div>
          <div>
            Weight: <Counter value={weight} />g
          </div>
        </Styled.Grid>
      </Styled.Container>
    </Link>
  );
};

export default BuildStats;
