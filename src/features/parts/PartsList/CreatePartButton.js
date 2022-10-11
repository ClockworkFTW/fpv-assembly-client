import { Link } from "react-router-dom";

import useAuth from "../auth/useAuth";
import { userRoles } from "../../config";

const CreatePartButton = () => {
  const user = useAuth();

  return (
    user?.role === userRoles.admin && (
      <Link to="/parts/edit/new">Create Part</Link>
    )
  );
};

export default CreatePartButton;
