import pluralize from "pluralize";
import { useParams } from "react-router-dom";
import { useGetPartsQuery } from "./partsApiSlice";

import Part from "./Part";

const partTypeToName = (partType) => {
  let words = partType.split("-");
  words = words.map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase());
  words[words.length - 1] = pluralize(words[words.length - 1]);
  return words.join(" ");
};

const PartsList = () => {
  const { partType } = useParams();
  const partName = partTypeToName(partType);

  const {
    data: parts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPartsQuery(partType);

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
