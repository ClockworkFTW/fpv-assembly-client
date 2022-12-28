import styled from "styled-components";

const Footer = () => {
  return (
    <Wrapper>
      <Container>
        <p>Footer</p>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  z-index: 1;
  position: relative;
  margin-top: auto;
  background-color: silver;
`;

const Container = styled.div`
  max-width: 90%;
  margin: 0 auto;
  padding: 10px 0;
`;

export default Footer;
