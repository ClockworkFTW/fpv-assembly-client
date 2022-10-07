import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../../auth/useAuth";
import { useGetBuildsQuery, useCreateBuildMutation } from "../buildsApiSlice";

import Build from "./Build";

const BuildList = () => {
  const user = useAuth();
  const navigate = useNavigate();

  const {
    data: builds,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetBuildsQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const [
    createBuild,
    {
      data: createdData,
      isLoading: isCreateLoading,
      isSuccess: isCreateSuccess,
      isError: isCreateError,
      error: createError,
    },
  ] = useCreateBuildMutation();

  useEffect(() => {
    if (isCreateSuccess) {
      const { id } = createdData.build;
      navigate(`/builds/edit/${id}`);
    }
  }, [isCreateSuccess, createdData, navigate]);

  let content = null;

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  if (isSuccess) {
    content = builds.ids.map((buildId) => (
      <Build key={buildId} buildId={buildId} />
    ));
  }

  if (isError) {
    content = <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Builds</h1>
      {user && <button onClick={createBuild}>Create Build</button>}
      {content}
    </div>
  );
};

export default BuildList;
