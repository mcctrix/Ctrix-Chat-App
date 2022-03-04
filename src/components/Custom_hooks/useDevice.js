import { useState, useEffect } from "react";

const useDeivce = () => {
  // hooks
  const [width, setWidth] = useState();

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.addEventListener("resize", handleResize);
    };
  });
  if (width >= 600) {
    return "Desktop";
  }
  if (width < 600) {
    return "Mobile";
  }
};
export default useDeivce;
