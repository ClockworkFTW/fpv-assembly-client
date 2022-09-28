import { Link } from "react-router-dom";

import useAuth from "../auth/useAuth";
import { partTypeToName } from "../../util";
import { partTypes, userRoles } from "../../config";

const PartsMenu = () => {
  const user = useAuth();

  return (
    <div>
      <h1>Parts</h1>
      {user?.role === userRoles.admin && (
        <Link to="/parts/edit/new">Create Part</Link>
      )}
      <ul>
        {Object.entries(partTypes).map(([key, value]) => (
          <li key={key} value={value}>
            <Link to={`/parts/${value}`}>{partTypeToName(value, true)}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PartsMenu;
