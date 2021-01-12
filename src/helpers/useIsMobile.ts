import { useEffect, useState } from "react";

const MOBILE_BREAK_POINT_PX = 900;

export const MOBILE_BREAK_POINT = `${MOBILE_BREAK_POINT_PX}px`;

const getIsMobile = () => {
  if (typeof window === "undefined") {
    return false;
  }

  return window.innerWidth <= MOBILE_BREAK_POINT_PX;
};

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(getIsMobile());

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      // Set window width/height to state
      setIsMobile(getIsMobile());
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  if (typeof window === "undefined") {
    return false;
  }

  return isMobile;
};

export default useIsMobile;
