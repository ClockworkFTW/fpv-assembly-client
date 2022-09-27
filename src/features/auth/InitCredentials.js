import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { selectCurrentToken } from "./authSlice";
import { useRefreshAccessTokenMutation } from "./authApiSlice";

const InitCredentials = () => {
  const effectRan = useRef(false);

  const token = useSelector(selectCurrentToken);

  const [refresh, { isLoading }] = useRefreshAccessTokenMutation();

  useEffect(() => {
    const shouldRun =
      effectRan.current === true || process.env.NODE_ENV !== "development";

    if (!token && shouldRun) {
      refresh();
    }

    return () => (effectRan.current = true);

    // eslint-disable-next-line
  }, []);

  return isLoading ? null : <Outlet />;
};

export default InitCredentials;
