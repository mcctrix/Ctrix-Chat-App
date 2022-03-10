import { useContext, useState } from "react";

import AppContext from "../GlobalStore/Context";

import styles from "../../styles/AddChats.module.css";
import classes from "../GlobalStore/GlobalStyles.module.css";
import AddChatPerson from "./SideBar/AddChats/AddChatPerson";

export default function AddChats() {
  // Init
  const context = useContext(AppContext);

  // Hooks
  const [groupAddMode, setgroupAddMode] = useState(false);

  const toggleGroupMode = () => {
    setgroupAddMode((val) => !val);
  };

  return (
    <div className={`${classes.bgcolor} ${styles.main}`}>
      <button
        className={`${classes.bgcolorGroupChat} ${classes.textcolor} ${styles.groupChatBtn}`}
        onClick={toggleGroupMode}
      >
        Make Group Chat
      </button>
      <ul>
        {context.UsersData.map((user) => (
          <AddChatPerson
            user={user}
            key={user.User_ID}
            GroupMode={groupAddMode}
          />
        ))}
      </ul>
    </div>
  );
}
