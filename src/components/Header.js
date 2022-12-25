import { Link } from "react-router-dom";
import styled from "styled-components";

// API
import { useSignOutMutation } from "../features/auth/authApiSlice";

// Components
import PartsMenu from "../features/parts/PartsMenu";
import BuildButton from "../features/builds/BuildButton";

// Hooks
import useAuth from "../hooks/useAuth";

const Header = () => {
  const user = useAuth();

  const [signOut] = useSignOutMutation();

  const onSignOutClicked = async () => {
    await signOut();
    window.location.reload(false);
  };

  return (
    <Wrapper>
      <Container>
        <div>
          <Link to="/">FPV Assembly</Link>
          <Link to="/builds">Builds</Link>
          <PartsMenu />
        </div>
        <div>
          {user ? (
            <>
              <BuildButton />
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
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  z-index: 1;
  position: relative;
  background-color: silver;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 90%;
  margin: 0 auto;
  padding: 10px 0;
`;

export default Header;
