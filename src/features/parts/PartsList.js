import { useParams } from "react-router-dom";
import { useGetPartsQuery } from "./partsApiSlice";

import { partTypeToName } from "../../util";

import Part from "./Part";

const PartsList = () => {
  const { partType } = useParams();
  const partName = partTypeToName(partType, true);

  const {
    data: parts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPartsQuery();

  let content = null;

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  if (isSuccess) {
    content = parts.ids.map((partId) => (
      <Part key={partId} partId={partId} partType={partType} />
    ));
  }

  if (isError) {
    content = <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>{partName}</h1>
      {content}
    </div>
  );
};

export default PartsList;
