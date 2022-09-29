import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { store } from "../../app/store";
import { partsApiSlice } from "./partsApiSlice";

const PrefetchParts = () => {
  useEffect(() => {
    store.dispatch(
      partsApiSlice.util.prefetch("getParts", undefined, { force: true })
    );
  }, []);

  return <Outlet />;
};

export default PrefetchParts;
