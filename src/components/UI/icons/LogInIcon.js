import { IconContext } from "react-icons";
import { FiLogIn } from "react-icons/fi";

export default function LoginIcon() {
  return (
    <IconContext.Provider
      value={{ style: { color: "rgb(211, 127, 16)", fontSize: "4rem" } }}
    >
      <div>
        <FiLogIn />
      </div>
    </IconContext.Provider>
  );
}
