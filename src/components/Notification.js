import { useSelector } from "react-redux";
import styled from "styled-components";

// Components
import Icon from "./Icon";

const Notification = () => {
  const { notification } = useSelector((state) => state);

  const renderIcon = (type) => {
    switch (type) {
      case "success":
        return <Icon icon={["fas", "circle-check"]} />;
      case "warning":
        return <Icon icon={["fas", "triangle-exclamation"]} />;
      case "error":
        return <Icon icon={["fas", "square-xmark"]} />;
      default:
        break;
    }
  };

  return notification ? (
    <Container>
      <p>
        {renderIcon(notification.type)} {notification.message}
      </p>
    </Container>
  ) : null;
};

const Container = styled.div`
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px;
  border-radius: 4px;
  background-color: silver;
`;

export default Notification;
