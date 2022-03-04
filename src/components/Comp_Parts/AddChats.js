import { useContext } from "react";

import AppContext from "../GlobalStore/Context";

import styles from "../../styles/AddChats.module.css";
import AddChatPerson from "./SideBar/AddChats/AddChatPerson";

export default function AddChats() {
  const context = useContext(AppContext);
  return (
    <div className={styles.main}>
      <ul>
        {context.UsersData.map((user) => (
          <AddChatPerson user={user} key={user.User_ID} />
        ))}
      </ul>
    </div>
  );
}
