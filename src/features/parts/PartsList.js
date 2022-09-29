import { useParams } from "react-router-dom";
import { useGetPartsQuery } from "./partsApiSlice";

import { partTypeToName } from "../../util";

import Part from "./Part";
import PartsFilter from "./PartsFilter";

const PartsList = () => {
  const { partType } = useParams();

  const partName = partTypeToName(partType, true);

  const {
    data: parts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPartsQuery(partType, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

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
      <PartsFilter />
      {content}
    </div>
  );
};

export default PartsList;
