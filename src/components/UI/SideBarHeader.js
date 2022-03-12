import { useContext, useState } from "react";
import { signOut, getAuth } from "firebase/auth";
import AppContext from "../GlobalStore/Context";
import { useNavigate } from "react-router-dom";
import usePictures from "../Custom_hooks/usePictures";

import styles from "../../styles/SideBarHeader.module.css";
import classes from "../GlobalStore/GlobalStyles.module.css";

import BackIcon from "./BackIcon";
import DotIcon from "./DotIcon";
import UserSettings from "./UserSettings";

export default function SideBarHeader(props) {
  // init
  const [Placeholder] = usePictures();
  const Navigate = useNavigate();
  const context = useContext(AppContext);
  const auth = getAuth();
  const [ShowSetting, setShowSetting] = useState(false);

  const showDropDown = () => {
    context.setsideBarOptions((snap) => !snap);
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
  const ShowSettingHandler = () => {
    context.setsideBarOptions((snap) => !snap);

    context.setDisplayUserSettings(true);
  };
  return (
    <div className={`${classes.darkerbgcolor} ${styles.main}`}>
      {props.id === "new" && (
        <button
          onClick={() => context.setnewPersonaddbtn(false)}
          className={styles.backbuttondiv}
        >
          {props.id === "new" ? <BackIcon /> : null}
        </button>
      )}
      <div className={styles.imgnamediv}>
        <img
          className={styles.userimage}
          alt="User profile"
          src={
            context?.Current_UserData?.[0]?.ProfilePicture
              ? context?.Current_UserData?.[0]?.ProfilePicture
              : Placeholder
          }
        />

        <h1 className={`${classes.textcolor} ${styles.title}`}>
          {props.title}
        </h1>
      </div>
      <div className={styles.options} onClick={showDropDown}>
        <DotIcon />
        <div
          className={`${styles.dropdown} ${
            context.sideBarOptions ? styles.showmenu : null
          }`}
        >
          <ul className={styles.dropdownlist} id="dropdownmenu">
            <li onClick={ShowSettingHandler}>Edit Profile</li>
            <li onClick={SignOut}>Logout</li>
            {/* <li>Themes</li>
            <li>Settings</li>
            <li>Help</li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}
