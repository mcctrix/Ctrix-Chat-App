import { useState, useEffect } from "react";
import { isMobileOnly } from "react-device-detect";

const useDevice = () => {
  // hooks
  const [Mobile, setMobile] = useState();

  // const handleResize = () => {
  //   setWidth(window.innerWidth);
  // };
  const setDevice = (val) => {
    setMobile(val);
  };

  useEffect(() => {
    // window.addEventListener("resize", handleResize);
    // return () => {
    //   window.addEventListener("resize", handleResize);
    // };
    if (isMobileOnly) {
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
  return Mobile;
};
export default useDevice;
