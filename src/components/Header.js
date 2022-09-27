import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectCurrentToken } from "../features/auth/authSlice";
import { useSignOutMutation } from "../features/auth/authApiSlice";

const Header = () => {
  const token = useSelector((state) => selectCurrentToken(state));

  const [signOut, { isLoading, isSuccess, isError, error }] =
    useSignOutMutation();

  return (
    <div>
      <Link to="/">FPV Assembly</Link>
      <Link to="/parts">Parts</Link>
      <Link to="/builds">Builds</Link>
      {token ? (
        <button onClick={signOut}>Sign Out</button>
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
