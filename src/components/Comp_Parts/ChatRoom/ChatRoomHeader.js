import { useContext } from "react";
import AppContext from "../../GlobalStore/Context";
import useDevice from "../../Custom_hooks/useDevice";
import usePictures from "../../Custom_hooks/usePictures";

import styles from "../../../styles/ChatRoomHeader.module.css";
import classes from "../../GlobalStore/GlobalStyles.module.css";

import BackIcon from "../../UI/BackIcon";

export default function ChatRoomHeader() {
  // Init
  const context = useContext(AppContext);
  const [Placeholder] = usePictures();
  const DEVICE = useDevice();

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
      {DEVICE === "Desktop" ? null : (
        <div onClick={closeCurrentChat} className={styles.backbtn}>
          <BackIcon />
        </div>
      )}
      <img className={styles.userimage} alt="User profile" src={UserPic} />
      <h1 className={styles.username}>{context.userNameActiveChat}</h1>
    </header>
  );
}
