import { IconContext } from "react-icons";
import { IoAddCircleSharp } from "react-icons/io5";

export default function AddIcon() {
  return (
    <IconContext.Provider
      value={{ style: { color: "rgb(211, 127, 16)", fontSize: "4rem" } }}
    >
      <div>
        <IoAddCircleSharp />
      </div>
    </IconContext.Provider>
  );
}
