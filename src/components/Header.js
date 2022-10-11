import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import useAuth from "../features/auth/useAuth";
import { useSignOutMutation } from "../features/auth/authApiSlice";
import { clearActiveBuildId } from "../features/builds/activeBuildIdSlice";

import PartsMenu from "../features/parts/PartsList/PartsMenu";

const Header = () => {
  const dispatch = useDispatch();

  const user = useAuth();

  const [signOut] = useSignOutMutation();

  const onSignOutClicked = async () => {
    await signOut();
    dispatch(clearActiveBuildId());
  };

  return (
    <div>
      <Link to="/">FPV Assembly</Link>
      <Link to="/builds">Builds</Link>
      <PartsMenu />
      {user ? (
        <>
          <Link to={`/profile/${user.id}`}>{user.username}</Link>
          <button onClick={onSignOutClicked}>Sign Out</button>
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
