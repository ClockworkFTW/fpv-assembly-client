import { useSelector } from "react-redux";

import useAuth from "hooks/useAuth";

const useActiveBuildId = () => {
  const user = useAuth();
  const activeBuildId = useSelector((state) => state.activeBuildId);
  const buildId = activeBuildId || user?.activeBuildId;
  return buildId;
};

export default useActiveBuildId;
