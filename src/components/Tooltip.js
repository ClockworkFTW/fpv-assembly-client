import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

// Components
import Icon from "./Icon";

const Tooltip = ({ id, content }) => (
  <>
    <Icon id={id} icon={["fas", "circle-question"]} color="silver" size="lg" />
    <ReactTooltip
      anchorId={id}
      content={content}
      style={{ maxWidth: "200px" }}
    />
  </>
);

export default Tooltip;
