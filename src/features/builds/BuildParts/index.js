import styled from "styled-components";

// Config
import { partTypes } from "../../../config";

// Components
import BuildTableGroup from "./BuildTableGroup";

const BuildParts = ({ buildId, parts }) => {
  const sortedParts = parts.slice();
  sortedParts.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <BuildTable>
      <TableHead>
        <Row>
          <Cell>Part</Cell>
          <Cell>Name</Cell>
          <Cell>Weight</Cell>
          <Cell>Rating</Cell>
          <Cell>Cost</Cell>
        </Row>
      </TableHead>
      <TableBody>
        {Object.entries(partTypes).map(([key]) => {
          const groupedParts = parts.filter((part) => part.type === key);
          groupedParts.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
          return (
            <BuildTableGroup
              key={key}
              buildId={buildId}
              partType={key}
              parts={groupedParts}
            />
          );
        })}
      </TableBody>
    </BuildTable>
  );
};

const BuildTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableBody = styled.tbody``;

const TableHead = styled.thead``;

const Row = styled.tr``;

const Cell = styled.th`
  text-align: left;
  padding: 4px 8px;
  border-bottom: 1px solid grey;
`;

export default BuildParts;
