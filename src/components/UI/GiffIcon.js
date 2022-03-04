import { IconContext } from "react-icons";
import { AiOutlineFileGif } from "react-icons/ai";

export default function GiffIcon() {
  return (
    <IconContext.Provider
      value={{ style: { color: "rgb(255, 255, 255)", fontSize: "2.3rem" } }}
    >
      <div>
        <AiOutlineFileGif />
      </div>
    </IconContext.Provider>
  );
}
