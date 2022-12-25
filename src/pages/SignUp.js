import { Link, Navigate } from "react-router-dom";
import styled from "styled-components";

// API
import { useSignUpMutation } from "features/auth/authApiSlice";

// Components
import SignUpForm from "features/auth/SignUpForm";
import SSO from "features/auth/SSO";

// Hooks
import useAuth from "hooks/useAuth";

const SignUpPage = () => {
  const user = useAuth();

  const [signUp, { isLoading }] = useSignUpMutation();

  return user ? (
    <Navigate to="/" />
  ) : (
    <Container>
      <h1>Sign Up</h1>
      <SignUpForm signUp={signUp} isLoading={isLoading} />
      <SSO />
      <Redirect>
        Already have an account? Sign in <Link to="/sign-in">here</Link>.
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

export default SignUpPage;
