import { useContext, useState } from "react";
import AppContext from "../../GlobalStore/Context";
import useDevice from "../../Custom_hooks/useDevice";
import usePictures from "../../Custom_hooks/usePictures";

import styles from "../../../styles/ChatRoomHeader.module.css";
import classes from "../../GlobalStore/GlobalStyles.module.css";

import BackIcon from "../../UI/BackIcon";
import DotIcon from "../../UI/DotIcon";
import ChatOptionsDiv from "../../UI/ChatOptionsDiv";

export default function ChatRoomHeader() {
  // Init
  const [ShowOptions, setShowOptions] = useState(false);
  const context = useContext(AppContext);
  const [Placeholder] = usePictures();
  const DEVICE = useDevice();

  const ShowOptionHandler = () => {
    setShowOptions(true);
  };

  const UserPicObtain =
    context.userNameActiveChat &&
    context?.allUsersData?.find?.(
      (data) => data.NickName === context.userNameActiveChat
    )?.ProfilePicture;

  const UserPic = UserPicObtain ? UserPicObtain : Placeholder;

  const closeCurrentChat = () => {
    context.setopenChat(false);
    context.setactiveChat("");
  };

  return (
    <header
      className={`${classes.textcolor} ${classes.darkerbgcolor} ${styles.header}`}
    >
      <div className={styles.leftDiv}>
        {DEVICE === "Desktop" ? null : (
          <div onClick={closeCurrentChat} className={styles.backbtn}>
            <BackIcon />
          </div>
        )}
        <img className={styles.userimage} alt="User profile" src={UserPic} />
        <h1 className={styles.username}>{context.userNameActiveChat}</h1>
      </div>
      <div>
        <div onClick={ShowOptionHandler}>
          <DotIcon />
        </div>
        <div
          className={`${styles.Optionsdiv} ${
            ShowOptions && styles.DisplayOptions
          }`}
        >
          <ChatOptionsDiv setVisibility={setShowOptions} />
        </div>
      </div>
    </header>
  );
}
