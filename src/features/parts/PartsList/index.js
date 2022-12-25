import styled from "styled-components";

// Components
import PartsTableHeader from "features/parts/PartsList/PartsTableHeader";
import PartsTableRow from "features/parts/PartsList/PartsTableRow";

const PartsList = ({ parts }) => (
  <PartsTable>
    <PartsTableHeader />
    <PartsTableBody>
      {parts.ids.map((partId) => (
        <PartsTableRow key={partId} partId={partId} />
      ))}
    </PartsTableBody>
  </PartsTable>
);

const PartsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const PartsTableBody = styled.tbody``;

export default PartsList;
