import { Link } from "react-router-dom";

import { partTypes } from "../../config";
import { partTypeToName } from "../../util";

const PartsMenu = () => (
  <div>
    <h1>Parts</h1>
    <Link to="/parts/edit/new">Create Part</Link>
    <ul>
      {Object.entries(partTypes).map(([key, value]) => (
        <li key={key} value={value}>
          <Link to={`/parts/${value}`}>{partTypeToName(value, true)}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default PartsMenu;
