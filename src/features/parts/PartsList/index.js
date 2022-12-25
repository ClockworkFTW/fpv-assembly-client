import styled from "styled-components";

import PartsTableHeader from "./PartsTableHeader";
import PartsTableRow from "./PartsTableRow";

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
