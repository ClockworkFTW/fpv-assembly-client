import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  useGetBuildQuery,
  useUpdateBuildMutation,
  useDeleteBuildMutation,
} from "../buildsApiSlice";

import BuildForm from "./BuildForm";

const BuildEditor = () => {
  const navigate = useNavigate();

  const { buildId } = useParams();

  const {
    data: build,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetBuildQuery(buildId);

  const [
    updateBuild,
    {
      data: updatedData,
      isLoading: isUpdateLoading,
      isSuccess: isUpdateSuccess,
      isError: isUpdateError,
      error: updateError,
    },
  ] = useUpdateBuildMutation();

  useEffect(() => {
    if (isUpdateSuccess) {
      const { id } = updatedData.build;
      navigate(`/builds/${id}`);
    }
  }, [isUpdateSuccess, updatedData, navigate]);

  const [
    deleteBuild,
    {
      isLoading: isDeleteLoading,
      isSuccess: isDeleteSuccess,
      isError: isDeleteError,
      error: deleteError,
    },
  ] = useDeleteBuildMutation();

  useEffect(() => {
    if (isDeleteSuccess) {
      navigate(`/builds`);
    }
  }, [isDeleteSuccess, navigate]);

  const handleOnSubmit = (build) => {
    updateBuild({ build, buildId });
  };

  const renderLoader = () =>
    isUpdateLoading || isDeleteLoading ? <p>Loading...</p> : null;

  const renderError = () =>
    isUpdateError || isDeleteError ? (
      <div>
        {isUpdateError && <p>{updateError?.data?.message}</p>}
        {isDeleteError && <p>{deleteError?.data?.message}</p>}
      </div>
    ) : null;

  return isLoading ? (
    <p>Loading...</p>
  ) : build ? (
    <div>
      <h1>Build Editor</h1>
      {renderLoader()}
      {renderError()}
      <BuildForm build={build} handleOnSubmit={handleOnSubmit} />
    </div>
  ) : (
    <p>Build not found...</p>
  );
};

export default BuildEditor;
