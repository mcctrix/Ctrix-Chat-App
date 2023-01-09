import { IconContext } from "react-icons";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useColorMode } from "@chakra-ui/react";

export default function DotIcon() {
  const { colorMode } = useColorMode();
  const divStyle = {
    cursor: "pointer",
  };
  return (
    <IconContext.Provider
      value={{
        style: {
          color: colorMode === "dark" ? "rgb(255, 255, 255)" : "rgb(0,0,0)",

          fontSize: "1.55em",
        },
      }}
    >
      <div style={divStyle}>
        <BsThreeDotsVertical />
      </div>
    </IconContext.Provider>
  );
}
