import { useEffect } from "react";
import { store } from "../../app/store";
import { partsApiSlice } from "./partsApiSlice";
import { Outlet } from "react-router-dom";

const PrefetchParts = () => {
  useEffect(() => {
    // console.log("subscribing");
    const parts = store.dispatch(partsApiSlice.endpoints.getParts.initiate());

    return () => {
      // console.log("unsubscribing");
      parts.unsubscribe();
    };
  }, []);

  return <Outlet />;
};

export default PrefetchParts;
