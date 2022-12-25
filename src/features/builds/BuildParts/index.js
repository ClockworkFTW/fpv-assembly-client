import styled from "styled-components";

// Config
import { partTypes } from "../../../config";

// Components
import BuildTableHeader from "./BuildTableHeader";
import BuildTableGroup from "./BuildTableGroup";
import BuildTableFooter from "./BuildTableFooter";

const BuildParts = ({ buildId, parts }) => {
  const sortedParts = parts.slice();
  sortedParts.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <BuildTable>
      <BuildTableHeader />
      <BuildTableBody>
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
      </BuildTableBody>
      <BuildTableFooter parts={parts} />
    </BuildTable>
  );
};

const BuildTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const BuildTableBody = styled.tbody``;

export default BuildParts;
