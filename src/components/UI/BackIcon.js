import { IconContext } from "react-icons";
import { BiArrowBack } from "react-icons/bi";

export default function BackIcon() {
  return (
    <IconContext.Provider
      value={{ style: { color: "#e4e6eb", fontSize: "1.5rem" } }}
    >
      <div>
        <BiArrowBack />
      </div>
    </IconContext.Provider>
  );
}
