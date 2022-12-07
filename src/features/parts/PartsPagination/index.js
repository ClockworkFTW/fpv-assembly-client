import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const PartsPagination = ({ pagination }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const onClick = (page) => {
    searchParams.set("page", page);
    setSearchParams(searchParams);
  };

  return pagination.count === 1 ? null : (
    <Container>
      {[...Array(pagination.count)].map((_, i) => (
        <Button
          key={i}
          isActive={pagination.page === i + 1}
          onClick={() => onClick(i + 1)}
        >
          {i + 1}
        </Button>
      ))}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  text-align: center;
`;

const Button = styled.button`
  display: inline-block;
  margin: 10px;
  padding: 4px 8px;
  color: white;
  background-color: ${({ isActive }) => (isActive ? "blue" : "grey")};
  :hover {
    cursor: pointer;
  }
`;

export default PartsPagination;
