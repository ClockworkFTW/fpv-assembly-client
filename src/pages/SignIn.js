import { Link, Navigate } from "react-router-dom";
import styled from "styled-components";

// API
import { useSignInMutation } from "features/auth/authApiSlice";

// Components
import SignInForm from "features/auth/SignInForm";
import SSO from "features/auth/SSO";

// Hooks
import useAuth from "hooks/useAuth";

const SignInPage = () => {
  const user = useAuth();

  const [signIn, { isLoading }] = useSignInMutation();

  return user ? (
    <Navigate to="/" />
  ) : (
    <Container>
      <h1>Sign In</h1>
      <SignInForm signIn={signIn} isLoading={isLoading} />
      <SSO />
      <Redirect>
        Don't have an account yet? Sign up <Link to="/auth/sign-up">here</Link>.
      </Redirect>
    </Container>
  );
};

const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

const Redirect = styled.p`
  text-align: center;
`;

export default SignInPage;
