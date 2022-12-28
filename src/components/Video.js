import ReactPlayer from "react-player";
import styled from "styled-components";

const Video = ({ url }) => <Container url={url} width="100%" height="100%" />;

const Container = styled(ReactPlayer)``;

export default Video;
