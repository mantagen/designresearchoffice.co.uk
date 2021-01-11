const MOBILE_BREAK_POINT_PX = "900";

export const MOBILE_BREAK_POINT = `${MOBILE_BREAK_POINT_PX}px`;

const getIsMobile = () => {
  if (typeof window === "undefined") {
    return false;
  }

  return window.innerWidth <= 900;
};

export default getIsMobile;
