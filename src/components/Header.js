import { Link } from "react-router-dom";

import { useSignOutMutation } from "../features/auth/authApiSlice";
import useAuth from "../features/auth/useAuth";

const Header = () => {
  const [signOut] = useSignOutMutation();
  const user = useAuth();

  return (
    <div>
      <Link to="/">FPV Assembly</Link>
      <Link to="/parts">Parts</Link>
      <Link to="/builds">Builds</Link>
      {user ? (
        <>
          <Link to={`/profile/${user.id}`}>{user.username}</Link>
          <button onClick={signOut}>Sign Out</button>
        </>
      ) : (
        <>
          <Link to="/sign-in">Sign In</Link>
          <Link to="/sign-up">Sign Up</Link>
        </>
      )}
    </div>
  );
};

export default Header;
