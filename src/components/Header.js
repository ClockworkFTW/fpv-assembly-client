import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

// API
import useAuth from "../features/auth/useAuth";
import { useSignOutMutation } from "../features/auth/authApiSlice";
import { clearActiveBuildId } from "../features/builds/activeBuildIdSlice";

// Components
import PartsMenu from "../features/parts/PartsMenu";

const Header = () => {
  const dispatch = useDispatch();

  const user = useAuth();

  const [signOut] = useSignOutMutation();

  const onSignOutClicked = async () => {
    await signOut();
    dispatch(clearActiveBuildId());
  };

  return (
    <Container>
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
    </Container>
  );
};

const Container = styled.div`
  padding: 10px;
  background-color: silver;
`;

export default Header;
