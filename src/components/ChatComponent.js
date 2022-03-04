import { useContext } from "react";
import AppContext from "./GlobalStore/Context";

import styles from "../styles/Main.module.css";
import InActiveChat from "./Comp_Parts/Chat_Component/InActiveChat";

import usePMInit from "./Custom_hooks/usePMInit";

import ChatRoom from "./ChatRoom";
import SideBar from "./SideBar";

export default function ChatComponent() {
  // init
  // const context = useContext(AppContext);

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
