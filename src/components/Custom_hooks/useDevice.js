import { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";

const useDeivce = () => {
  // hooks
  const [IsMobile, setIsMobile] = useState();

  // const handleResize = () => {
  //   setWidth(window.innerWidth);
  // };
  const setDevice = (val) => {
    setIsMobile(val);
  };

  useEffect(() => {
    // window.addEventListener("resize", handleResize);
    // return () => {
    //   window.addEventListener("resize", handleResize);
    // };
    if (!false) {
      setDevice("Mobile");
      return;
    }
    setDevice("Desktop");
  }, []);
  // if (width >= 600) {
  //   return "Desktop";
  // }
  // if (width < 600) {
  //   return "Mobile";
  // }
  return IsMobile;
};
export default useDeivce;
