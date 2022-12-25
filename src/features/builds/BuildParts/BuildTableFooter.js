import styled from "styled-components";

// Components
import Counter from "../../../components/Counter";

const BuildTableFooter = ({ parts }) => {
  const price = parts.reduce((t, p) => t + p.price * p.quantity, 0);
  const weight = parts.reduce((t, p) => t + p.weight * p.quantity, 0);

  return (
    <TableFooter>
      <Row>
        <Cell />
        <Cell />
        <Cell />
        <Cell>
          <Counter value={weight} />g
        </Cell>
        <Cell>
          $<Counter value={price} />
        </Cell>
      </Row>
    </TableFooter>
  );
};

const TableFooter = styled.tfoot``;

const Row = styled.tr``;

const Cell = styled.td`
  padding: 4px 8px;
  border-top: 1px solid grey;
`;

export default BuildTableFooter;
