import { useContext } from "react";
import styles from "../styles/Main.module.css";

import AppContext from "./GlobalStore/Context";

import UserSettings from "../components/UI/UserSettings";

import ChatRoom from "./ChatRoom";
import SideBar from "./SideBar";

export default function ChatComponent() {
  // Inits
  const context = useContext(AppContext);

  return (
    <div className={styles.Main}>
      <div className={styles.sidebar}>
        <SideBar />
      </div>
      <div className={styles.chatroom}>
        <ChatRoom />
      </div>
      {!context.Current_UserName && !context.Loading && (
        <UserSettings Firsttime={true} />
      )}
      {context.DisplayUserSettings && <UserSettings />}
    </div>
  );
}
