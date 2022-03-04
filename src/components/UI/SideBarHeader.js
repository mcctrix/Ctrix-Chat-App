import { useState, useContext } from "react";
import { signOut, getAuth } from "firebase/auth";
import AppContext from "../GlobalStore/Context";
import { useNavigate } from "react-router-dom";

import styles from "../../styles/SideBarHeader.module.css";

import BackIcon from "./BackIcon";
import DotIcon from "./DotIcon";

export default function SideBarHeader(props) {
  // init
  const Navigate = useNavigate();
  const context = useContext(AppContext);
  const auth = getAuth();

  // Hooks
  const [dropDownShow, setdropDownShow] = useState(false);

  const showDropDown = () => {
    setdropDownShow((snap) => !snap);
  };

  const SignOut = () => {
    signOut(auth);
    context.setCurrent_UserID("");
    context.setCurrent_UserName("");
    context.setCurrent_UserData("");
    context.setUsersData("");
    context.setactiveChat(null);
    context.setprivateChatInit([]);
    Navigate("/");
  };
  return (
    <div className={styles.main}>
      {props.id == "new" ? (
        <button
          onClick={() => props.setaddBtnClicked(false)}
          className={styles.backbuttondiv}
        >
          {props.id === "new" ? <BackIcon /> : null}
        </button>
      ) : null}
      <div className={styles.imgnamediv}>
        <img
          className={styles.userimage}
          alt="User profile image"
          src="data:image/jpeg;base64,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"
        />
        <h1 className={styles.title}>{props.title}</h1>
      </div>
      <div className={styles.options} onClick={showDropDown}>
        <DotIcon />
        <div
          className={`${styles.dropdown} ${
            dropDownShow ? styles.showmenu : null
          }`}
        >
          <ul className={styles.dropdownlist}>
            <li onClick={SignOut}>Logout</li>
            <li>Themes</li>
            <li>Settings</li>
            <li>Help</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
