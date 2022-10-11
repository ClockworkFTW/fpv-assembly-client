import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

import useAuth from "../auth/useAuth";
import { initializeActiveBuildId } from "./activeBuildIdSlice";

const InitializeActiveBuild = () => {
  const dispatch = useDispatch();

  const user = useAuth();

  useEffect(() => {
    if (user) {
      dispatch(initializeActiveBuildId());
    }
  }, [user, dispatch]);

  return <Outlet />;
};

export default InitializeActiveBuild;
