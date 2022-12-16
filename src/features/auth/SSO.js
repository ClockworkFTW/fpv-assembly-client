import styled from "styled-components";

// Components
import Icon from "../../components/Icon";

const SSO = () => (
  <List>
    <Item>
      <Button href="https://jnb-api.ngrok.io/api/auth/sign-in/google">
        <Icon icon={["fab", "google"]} /> Google
      </Button>
    </Item>
    <Item>
      <Button href="https://jnb-api.ngrok.io/api/auth/sign-in/facebook">
        <Icon icon={["fab", "facebook-f"]} /> Facebook
      </Button>
    </Item>
    <Item>
      <Button href="https://jnb-api.ngrok.io/api/auth/sign-in/apple">
        <Icon icon={["fab", "apple"]} /> Apple
      </Button>
    </Item>
  </List>
);

const List = styled.ul``;

const Item = styled.li`
  margin: 10px 0;
`;

const Button = styled.a`
  display: block;
  padding: 10px;
  border-radius: 4px;
  background-color: silver;
  text-align: center;
`;

export default SSO;
