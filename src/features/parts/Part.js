import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectPartById } from "./partsApiSlice";

const Part = ({ partId, partType }) => {
  const navigate = useNavigate();

  const part = useSelector((state) => selectPartById(state, partId));

  return part.type === partType ? (
    <div>
      <p>{part.name}</p>
      <button onClick={() => navigate(`/parts/edit/${partId}`)}>edit</button>
    </div>
  ) : null;
};

export default Part;
