import styled from "styled-components";

import PartHead from "./PartHead";
import PartRow from "./PartRow";

const PartsList = ({ parts }) => (
  <Table>
    <TableHead>
      <PartHead />
    </TableHead>
    <TableBody>
      {parts.ids.map((partId) => (
        <PartRow key={partId} partId={partId} />
      ))}
    </TableBody>
  </Table>
);

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead``;

const TableBody = styled.tbody``;

export default PartsList;
