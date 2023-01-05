// Styles
import * as Styled from "features/builds/BuildDetails/PartsList/PartsList.style";

const PartsList = ({ parts }) => (
  <ul>
    {parts.map((part) => (
      <li key={part.id}>{part.name}</li>
    ))}
  </ul>
);

export default PartsList;
