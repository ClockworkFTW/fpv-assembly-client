import { useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";

// API
import { useGetPartsQuery } from "../features/parts/partsApiSlice";

// Components
import BuildStats from "../features/builds/BuildStats";
import PartsFilter from "../features/parts/PartsFilter";
import PartsBreadcrumbs from "../features/parts/PartsBreadcrumbs";
import PartsList from "../features/parts/PartsList";
import PartsPagination from "../features/parts/PartsPagination";

const PartsListPage = () => {
  const { partType } = useParams();
  const [searchParams] = useSearchParams();

  const partsQuery = `type=${partType}&${searchParams.toString()}`;

  const { data } = useGetPartsQuery(partsQuery, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  return data ? (
    <Container>
      <div>
        <BuildStats />
        <PartsFilter filter={data.filter} />
      </div>
      <div>
        <PartsBreadcrumbs filter={data.filter} />
        <PartsList parts={data.parts} />
        <PartsPagination pagination={data.pagination} />
      </div>
    </Container>
  ) : null;
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 20px;
`;

export default PartsListPage;
