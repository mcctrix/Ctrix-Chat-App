import { IconContext } from "react-icons";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function DotIcon() {
  const divStyle = {
    cursor: "pointer",
  };
  return (
    <IconContext.Provider
      value={{
        style: {
          color: "rgb(255, 255, 255)",
          fontSize: "1.6rem",
        },
      }}
    >
      <div style={divStyle}>
        <BsThreeDotsVertical />
      </div>
    </IconContext.Provider>
  );
}
