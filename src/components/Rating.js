import styled from "styled-components";

// Components
import Icon from "components/Icon";

const Rating = ({ rating }) => (
  <Container>
    {[1, 2, 3, 4, 5].map((i) => (
      <Icon
        key={i}
        icon={["fas", "star"]}
        color={rating >= i ? "yellow" : "grey"}
      />
    ))}
  </Container>
);

const Container = styled.span`
  display: flex;
`;

export default Rating;
