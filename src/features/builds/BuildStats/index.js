import { Link } from "react-router-dom";
import styled from "styled-components";

// API
import { useGetBuildQuery } from "../buildsApiSlice";

// Components
import Counter from "../../../components/Counter";

// Hooks
import useActiveBuildId from "../../../hooks/useActiveBuildId";

const BuildStats = () => {
  const buildId = useActiveBuildId();

  const { data: build } = useGetBuildQuery(buildId, { skip: !buildId });

  if (!build) return;

  const count = build.parts.reduce((t, p) => t + p.quantity, 0);
  const price = build.parts.reduce((t, p) => t + p.price * p.quantity, 0);
  const weight = build.parts.reduce((t, p) => t + p.weight * p.quantity, 0);

  return (
    <Link to={`/builds/edit/${build.id}`}>
      <Container>
        <li>
          Parts: <Counter value={count} />
        </li>
        <li>
          Total: $<Counter value={price} />
        </li>
        <li>
          Weight: <Counter value={weight} />g
        </li>
      </Container>
    </Link>
  );
};

const Container = styled.ul`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
  background-color: silver;
`;

export default BuildStats;
