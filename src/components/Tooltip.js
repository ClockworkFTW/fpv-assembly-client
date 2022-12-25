import { Tooltip as ReactTooltip } from "react-tooltip";

// Components
import Icon from "components/Icon";

const Tooltip = ({ id, content }) => (
  <>
    <Icon id={id} icon={["fas", "circle-question"]} size="lg" />
    <ReactTooltip
      anchorId={id}
      content={content}
      style={{ maxWidth: "200px" }}
    />
  </>
);

export default Tooltip;
