import { IconContext } from "react-icons";
import { BiArrowBack } from "react-icons/bi";

export default function BackIcon() {
  return (
    <IconContext.Provider
      value={{ style: { color: "white", fontSize: "2rem" } }}
    >
      <div>
        <BiArrowBack />
      </div>
    </IconContext.Provider>
  );
}
