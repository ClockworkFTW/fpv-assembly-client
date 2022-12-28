import { useEffect } from "react";

const useDisableScroll = (scrollDisabled) => {
  useEffect(() => {
    if (scrollDisabled) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [scrollDisabled]);
};

export default useDisableScroll;
