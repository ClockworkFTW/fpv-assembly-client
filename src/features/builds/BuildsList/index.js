import { useGetBuildsQuery } from "../buildsApiSlice";

import Build from "./Build";

const BuildsList = () => {
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

  return content;
};

export default BuildsList;
