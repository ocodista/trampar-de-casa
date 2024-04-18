import { useEffect, useRef, RefObject } from "react";
import Typed from "typed.js";

const useTyped = (el, options) => {
  const typed = useRef({});

  useEffect(() => {
    if (el?.current) {
      typed.current = new Typed(el?.current, options);
    }

    return () => {
      typed.current?.destroy();
    };
  }, []);
};

export default useTyped;
