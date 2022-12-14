import { createContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

// API
import {
  useGetBuildQuery,
  useUpdateBuildMutation,
  useDeleteBuildMutation,
} from "features/builds/buildsApiSlice";

// Components
import BuildName from "features/builds/BuildName";
import BuildParts from "features/builds/BuildParts";
import BuildImages from "features/builds/BuildImages";
import BuildLog from "features/builds/BuildLog";

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
      <div>
        <button onClick={onPublishBuild}>Publish</button>
        <button onClick={onDeleteBuild}>Delete</button>
      </div>
      <BuildName name={build.name} />
      <BuildParts parts={build.parts} />
      <BuildImages images={build.images} />
      <BuildLog log={build.log} images={build.images} />
    </BuildIdContext.Provider>
  ) : null;
};

export default BuildEditor;
