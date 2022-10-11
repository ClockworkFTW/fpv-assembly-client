import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { partTypeToName } from "../../../util";
import { partTypes } from "../../../config";

const PartsMenu = () => {
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const onLinkClicked = (value) => {
    setIsVisible(false);
    navigate(`/parts/${value}`);
  };

  const renderMenu = () => {
    if (isVisible) {
      return (
        <ul>
          {Object.entries(partTypes).map(([key, value]) => (
            <li key={key} onClick={() => onLinkClicked(value)}>
              {partTypeToName(value, true)}
            </li>
          ))}
        </ul>
      );
    }
  };

  return (
    <span>
      <button onClick={toggleVisibility}>parts</button>
      {renderMenu()}
    </span>
  );
};

export default PartsMenu;
