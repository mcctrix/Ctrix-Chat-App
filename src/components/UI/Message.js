import { useContext } from "react";
import AppContext from "../GlobalStore/Context";
import styles from "../../styles/Message.module.css";
import classes from "../GlobalStore/GlobalStyles.module.css";
import usePictures from "../Custom_hooks/usePictures";
import Gif from "./GifComp";

const Message = (props) => {
  // Init
  const context = useContext(AppContext);
  const [Placeholder] = usePictures();

  const UserObtain =
    context.allUsersData &&
    context?.allUsersData?.find?.((data) => data.User_ID === props.data.Sender);

  const UserPic = UserObtain.ProfilePicture
    ? UserObtain.ProfilePicture
    : Placeholder;
  return (
    <div
      className={`${styles.main} ${
        context.Current_UserID === props.data.Sender && classes.alignright
      }`}
    >
      {context.Current_UserID !== props.data.Sender && (
        <img
          className={`${styles.senderPhoto} ${styles.leftphoto}`}
          alt="User profile"
          src={UserPic}
        ></img>
      )}
      <div>
        {context.Current_UserID !== props.data.Sender && (
          <p className={styles.userName}>{UserObtain.NickName}</p>
        )}
        {props.data.Message === "Gif" ? (
          <Gif GIF={props.data.Gif} />
        ) : (
          <div
            className={`${
              context.Current_UserID === props.data.Sender
                ? classes.msgalignright
                : classes.messageleft
            } ${styles.message}`}
            key={props.data.id}
          >
            <div className={styles.msgtext}>
              {props.data.text}
              {/* <div className={styles.hovertext}>
              {context.UsersData &&
                context?.allUsersData?.find?.(
                  (data) => data.User_ID === props.data.Sender
                  )?.NickName}
                </div> */}
            </div>
          </div>
        )}
      </div>
      {/* {context.Current_UserID === props.data.Sender && (
        <img
          className={`${styles.senderPhoto} ${styles.rightphoto}`}
          alt="User profile"
          src={
            context?.Current_UserData?.[0]?.ProfilePicture
              ? context?.Current_UserData?.[0]?.ProfilePicture
              : Placeholder
          }
        ></img>
      )} */}
    </div>
  );
};

export default Message;
