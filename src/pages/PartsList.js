import { useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";

// API
import { useGetPartsQuery } from "../features/parts/partsApiSlice";

// Components
import PartsFilter from "../features/parts/PartsFilter";
import PartsBreadcrumbs from "../features/parts/PartsBreadcrumbs";
import PartsList from "../features/parts/PartsList";
import PartsPagination from "../features/parts/PartsPagination";

const PartsListPage = () => {
  const { partType } = useParams();
  const [searchParams] = useSearchParams();

  const partsQuery = `type=${partType}&${searchParams.toString()}`;

  const { data, isLoading, isError, error } = useGetPartsQuery(partsQuery, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  return data ? (
    <Wrapper>
      <Container>
        <PartsFilter filter={data.filter} />
        <div>
          <PartsBreadcrumbs filter={data.filter} />
          <PartsList parts={data.parts} />
          <PartsPagination pagination={data.pagination} />
        </div>
      </Container>
    </Wrapper>
  ) : null;
};

const Wrapper = styled.div`
  max-width: 2000px;
  margin: 0 auto;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 20px;
`;

export default PartsListPage;
