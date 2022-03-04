import { IconContext } from "react-icons";
import { FiLogOut } from "react-icons/fi";

export default function LogOutIcon() {
  return (
    <IconContext.Provider
      value={{ style: { color: "rgb(211, 127, 16)", fontSize: "2rem" } }}
    >
      <div>
        <FiLogOut />
      </div>
    </IconContext.Provider>
  );
}
