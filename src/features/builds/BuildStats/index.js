import { Link } from "react-router-dom";
import CountUp from "react-countup";
import styled from "styled-components";

// API
import { useGetBuildQuery } from "../buildsApiSlice";

// Hooks
import useActiveBuildId from "../../../hooks/useActiveBuildId";
import usePrevious from "../../../hooks/usePrevious";

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
          Parts: <Total value={count} />
        </li>
        <li>
          Total: $<Total value={price} />
        </li>
        <li>
          Weight: <Total value={weight} />g
        </li>
      </Container>
    </Link>
  );
};

const Total = ({ value }) => {
  const start = usePrevious(value);
  return <CountUp start={start || 0} end={value} />;
};

const Container = styled.ul`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
  background-color: silver;
`;

export default BuildStats;
