import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <Wrapper>
        <Container>
          <Outlet />
        </Container>
      </Wrapper>
      <Footer />
    </>
  );
};

const Wrapper = styled.div`
  background-color: white;
`;

const Container = styled.div`
  max-width: 96%;
  margin: 0 auto;
  padding: 40px 0;
`;

export default Layout;
