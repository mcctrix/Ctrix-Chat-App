import { useEffect, useContext, useState } from "react";
import AppContext from "../GlobalStore/Context";
import BackIcon from "./BackIcon";
import usePictures from "../Custom_hooks/usePictures";

import styles from "../../styles/ChatOptionsDiv.module.css";

export default function ChatOptionsDiv(props) {
  const [Placeholder] = usePictures();
  const context = useContext(AppContext);
  const [UserList, setUserList] = useState();
  useEffect(() => {
    const DATA = context.activeChat?.ChatUserID?.map((ID) =>
      context.allUsersData.filter((data) => {
        return data.User_ID === ID ? true : false;
      })
    );

    setUserList(DATA);
    // eslint-disable-next-line
  }, [context.activeChat]);
  const BackButton = () => {
    props.setVisibility(false);
  };

  return (
    <div className={styles.container}>
      <header className={styles.head}>
        <div onClick={BackButton}>
          <BackIcon />
        </div>
        <h3>Users</h3>
        <div></div>
      </header>
      <div className={styles.UserListdiv}>
        {UserList?.map((user) => (
          <div key={user[0].User_ID} className={styles.userdiv}>
            <img
              alt="User Pic"
              src={
                user?.[0].ProfilePicture === undefined
                  ? Placeholder
                  : user[0].ProfilePicture
              }
            />
            <p>
              {user[0].User_ID === context.Current_UserID
                ? "You"
                : user[0].NickName}
            </p>
            <div></div>
          </div>
        ))}
      </div>
    </div>
  );
}
