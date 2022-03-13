import { IconContext } from "react-icons";
import { IoAddCircleSharp } from "react-icons/io5";

export default function AddIcon() {
  return (
    <IconContext.Provider
      value={{ style: { color: "#e4e6eb", fontSize: "4rem" } }}
    >
      <div>
        <IoAddCircleSharp />
      </div>
    </IconContext.Provider>
  );
}
