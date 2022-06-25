import { IconContext } from "react-icons";
import { AiOutlineFileGif } from "react-icons/ai";

import { useColorMode } from "@chakra-ui/react";

export default function GiffIcon() {
  const { colorMode } = useColorMode();
  return (
    <IconContext.Provider
      value={{
        style: {
          color: colorMode === "dark" ? "rgb(255, 255, 255)" : "rgb(0,0,0)",
          fontSize: "2.3rem",
        },
      }}
    >
      <AiOutlineFileGif />
    </IconContext.Provider>
  );
}
