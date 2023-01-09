import { IconContext } from "react-icons";
import { BiArrowBack } from "react-icons/bi";

import { useColorMode } from "@chakra-ui/react";

export default function BackIcon() {
  const { colorMode } = useColorMode();
  return (
    <IconContext.Provider
      value={{
        style: {
          color: colorMode === "dark" ? "rgb(255, 255, 255)" : "rgb(0,0,0)",
          fontSize: "1.5rem",
        },
      }}
    >
      <div>
        <BiArrowBack />
      </div>
    </IconContext.Provider>
  );
}
