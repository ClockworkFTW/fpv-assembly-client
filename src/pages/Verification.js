import { Navigate } from "react-router-dom";
import styled from "styled-components";

// Hooks
import useAuth from "hooks/useAuth";

const Verification = () => {
  const user = useAuth();

  return user && user.isVerified ? (
    <Navigate to="/" />
  ) : (
    <Container>
      <h1>Thank you for signing up!</h1>
      <p>
        To confirm your e-mail address, we have sent you an e-mail with an
        activation link.
      </p>
    </Container>
  );
};

const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

export default Verification;
