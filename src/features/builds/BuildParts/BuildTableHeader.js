import styled from "styled-components";

const BuildTableHeader = () => (
  <TableHead>
    <Row>
      <Cell>Part</Cell>
      <Cell>Name</Cell>
      <Cell>Rating</Cell>
      <Cell>Weight</Cell>
      <Cell>Cost</Cell>
    </Row>
  </TableHead>
);

const TableHead = styled.thead``;

const Row = styled.tr``;

const Cell = styled.th`
  text-align: left;
  padding: 4px 8px;
  border-bottom: 1px solid grey;
`;

export default BuildTableHeader;
