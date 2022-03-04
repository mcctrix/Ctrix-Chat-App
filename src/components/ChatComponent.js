import styles from "../styles/Main.module.css";

import ChatRoom from "./ChatRoom";
import SideBar from "./SideBar";

export default function ChatComponent() {
  return (
    <div className={styles.Main}>
      <div className={styles.sidebar}>
        <SideBar />
      </div>
      <div className={styles.chatroom}>
        <ChatRoom />
        {/* {context.activeChat ? <ChatRoom /> : <InActiveChat />} */}
      </div>
    </div>
  );
}
