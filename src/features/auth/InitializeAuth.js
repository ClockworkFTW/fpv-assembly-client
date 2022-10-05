import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { selectCurrentToken } from "./authSlice";
import { useRefreshAccessTokenMutation } from "./authApiSlice";

const InitializeAuth = () => {
  const effectRan = useRef(false);

  const token = useSelector(selectCurrentToken);

  const [refresh] = useRefreshAccessTokenMutation();

  useEffect(() => {
    if (
      !token &&
      (effectRan.current === true || process.env.NODE_ENV !== "development")
    ) {
      refresh();
    }

    return () => (effectRan.current = true);

    // eslint-disable-next-line
  }, []);

  // TODO: Block outlet until effect has run

  return <Outlet />;
};

export default InitializeAuth;