import styled from "styled-components";

// Config
import { partTypes } from "config";

// Components
import BuildTableHeader from "features/builds/BuildParts/BuildTableHeader";
import BuildTableGroup from "features/builds/BuildParts/BuildTableGroup";
import BuildTableFooter from "features/builds/BuildParts/BuildTableFooter";

const BuildParts = ({ parts }) => {
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
            <BuildTableGroup key={key} partType={key} parts={groupedParts} />
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
