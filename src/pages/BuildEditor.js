import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

// API
import {
  useGetBuildQuery,
  useUpdateBuildMutation,
  useDeleteBuildMutation,
} from "../features/builds/buildsApiSlice";

// Components
import BuildParts from "../features/builds/BuildParts";

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
    <>
      <button onClick={onPublishBuild}>Publish</button>
      <button onClick={onDeleteBuild}>Delete</button>
      <BuildParts buildId={build.id} parts={build.parts} />
    </>
  ) : null;
};

export default BuildEditor;
