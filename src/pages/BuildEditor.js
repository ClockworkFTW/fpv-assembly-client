import { createContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

// API
import {
  useGetBuildQuery,
  useUpdateBuildMutation,
  useDeleteBuildMutation,
} from "features/builds/buildsApiSlice";

// Components
import BuildParts from "features/builds/BuildParts";
import BuildImages from "features/builds/BuildImages";

// Context
export const BuildIdContext = createContext(null);

const BuildEditor = () => {
  const navigate = useNavigate();

  const { buildId } = useParams();

  const { data: build } = useGetBuildQuery(buildId);
  const [updateBuild] = useUpdateBuildMutation();
  const [deleteBuild] = useDeleteBuildMutation();

  const onPublishBuild = async () => {
    const data = { isPublished: true };
    await updateBuild({ buildId, data });
    navigate(`/builds/${buildId}`);
  };

  const onDeleteBuild = async () => {
    await deleteBuild(buildId);
    navigate(`/builds`);
  };

  return build ? (
    <BuildIdContext.Provider value={buildId}>
      <button onClick={onPublishBuild}>Publish</button>
      <button onClick={onDeleteBuild}>Delete</button>
      <BuildParts parts={build.parts} />
      <BuildImages images={build.images} />
    </BuildIdContext.Provider>
  ) : null;
};

export default BuildEditor;
