import { useState, useEffect } from "react";

const useMediaQuery = (query: string) => {
  const mql = window.matchMedia(query);

  const [value, setValue] = useState(mql.matches);

  const getValue = () => {
    return mql.matches;
  };

  useEffect(
    () => {
      // Event listener callback
      // Note: By defining getValue outside of useEffect we ensure that it has ...
      // ... current values of hook args (as this hook callback is created once on mount).
      const handler = () => setValue(getValue);
      // Set a listener for each media query with above handler as callback.
      mql.addListener(handler);
      // Remove listeners on cleanup
      return () => mql.removeListener(handler);
    },
    [] // Empty array ensures effect is only run on mount and unmount
  );

  return value;
};

export default useMediaQuery;
