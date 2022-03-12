import { useContext, useState, useEffect } from "react";
import AppContext from "../GlobalStore/Context";
import useDevice from "../Custom_hooks/useDevice";
import usePictures from "../Custom_hooks/usePictures";

import styles from "../../styles/ChatModal.module.css";
import classes from "../GlobalStore/GlobalStyles.module.css";

export default function ChatModal(props) {
  // inits
  const [Placeholder] = usePictures();
  const DEVICE = useDevice();
  const context = useContext(AppContext);

  // Hooks
  const [ChatName, setChatName] = useState("");

  const UserPicObtain =
    ChatName &&
    context?.allUsersData?.find?.((data) => data.NickName === ChatName)
      ?.ProfilePicture;

  const UserPic = UserPicObtain ? UserPicObtain : Placeholder;

  const makeChatActive = () => {
    if (DEVICE === "Mobile") {
      context.setopenChat(true);
    }
    context.setuserNameActiveChat(() => {
      if (props.data.ChatType === "Group") {
        return props.data.ChatName;
      }
      return props.data.User1.ID === context.Current_UserID
        ? context.UsersData.find((val) => val.User_ID === props.data.User2.ID)
            .NickName
        : context.UsersData.find((val) => val.User_ID === props.data.User1.ID)
            .NickName;
    });
    context.setactiveChat(props.data);
  };
  useEffect(() => {
    if (props.data.ChatType === "DM") {
      setChatName(
        props.data.User1.ID === context.Current_UserID
          ? context?.UsersData?.find?.(
              (val) => val.User_ID === props.data.User2.ID
            ).NickName
          : context?.UsersData?.find?.(
              (val) => val.User_ID === props.data.User1.ID
            ).NickName
      );
    }
    if (props.data.ChatType === "Group") {
      setChatName(props.data.ChatName);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className={`${styles.main} ${
        context?.activeChat?.ChatID === props.data.ChatID && classes.activechat
      }`}
      onClick={makeChatActive}
    >
      <div className={styles.image}>
        <div
          className={`${
            context?.activeChat?.ChatID === props.data.ChatID &&
            classes.activeChatHeader
          }`}
        ></div>
        <img
          className={styles.userimage}
          alt="User profile"
          src={UserPic}
        ></img>
      </div>
      <div className={styles.detail}>
        <h1 className={styles.chatname}>{ChatName}</h1>
        {/* <p>Last message</p> */}
      </div>
      <div className={styles.emptydiv}></div>
    </div>
  );
}
