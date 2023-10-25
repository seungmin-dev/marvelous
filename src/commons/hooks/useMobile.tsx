import { useEffect, useState } from "react";

export const useMobile = () => {
  const [isMobile, setMobile] = useState(false);

  const handleResize = () => {
    if (window.innerWidth < 800) setMobile(true);
    else setMobile(false);
  };
  window.addEventListener("resize", handleResize);

  useEffect(() => {
    // width가 800이 넘으면 false
    const mediaQuery = window.matchMedia("(max-width: 800px)").matches;
    setMobile(mediaQuery);
  }, []);

  return { isMobile };
};
