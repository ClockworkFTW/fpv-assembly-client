import { useSelector } from "react-redux";
import { getPartsSelectors } from "./partsApiSlice";

const Part = ({ partId, partType }) => {
  const { selectById } = getPartsSelectors(partType);
  const part = useSelector((state) => selectById(state, partId));

  return (
    <div>
      <p>{part.name}</p>
    </div>
  );
};

export default Part;
