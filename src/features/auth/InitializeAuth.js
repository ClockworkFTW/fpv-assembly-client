import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { selectCurrentToken } from "features/auth/authSlice";
import { useRefreshAccessTokenMutation } from "features/auth/authApiSlice";

const InitializeAuth = () => {
  const effectRan = useRef(false);

  const token = useSelector(selectCurrentToken);

  const [refresh, { isUninitialized }] = useRefreshAccessTokenMutation();

  const [refreshComplete, setRefreshComplete] = useState(false);

  const refreshToken = async () => {
    await refresh();
    setRefreshComplete(true);
  };

  useEffect(() => {
    const env = process.env.NODE_ENV;

    // Ignore React strict mode double render
    if (!token && (effectRan.current === true || env !== "development")) {
      refreshToken();
    }

    return () => (effectRan.current = true);

    // eslint-disable-next-line
  }, []);

  return !isUninitialized && refreshComplete ? <Outlet /> : null;
};

export default InitializeAuth;
