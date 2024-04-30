import { useEffect, useRef } from "react";
import Typed from "typed.js";

const useTyped = (el, options, enabled) => {
  const typed = useRef(null);

  useEffect(() => {
    if (enabled && el?.current) {
      typed.current = new Typed(el.current, options);
      return () => {
        typed.current?.destroy();
      };
    }
  }, [el, options, enabled]);

  return typed.current;
};

export default useTyped;