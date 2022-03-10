import { useEffect, useContext, useRef } from "react";

import useDevice from "./Custom_hooks/useDevice";

// UI and styles
import ChatRoomHeader from "./Comp_Parts/ChatRoom/ChatRoomHeader";
import styles from "../styles/ChatRoom.module.css";

import AppContext from "./GlobalStore/Context";
import useMsgFetch from "./Custom_hooks/useMsgFetch";
import Message from "./UI/Message";
import MsgSendUI from "./UI/MsgSendUI";

export default function ChatRoom() {
  //init
  const context = useContext(AppContext);
  const DEVICE = useDevice();

  // Fetching messages from firebase
  const [Messages] = useMsgFetch();

  // Ref Hooks

  const emptyDivRef = useRef();

  useEffect(() => {
    if (Messages) {
      setTimeout(() => {
        emptyDivRef.current.scrollIntoView({ smooth: true });
      }, 300);
    }
  }, [Messages]);

  return (
    <div
      className={`${styles.main} ${
        DEVICE === "Mobile" && !context.openChat && styles.mobchatroom
      }`}
    >
      <ChatRoomHeader />

      <div className={styles.messagesdiv}>
        {Messages &&
          Messages.map((data) => <Message key={data.id} data={data} />)}
        <div ref={emptyDivRef}></div>
      </div>

      <MsgSendUI emptydiv={emptyDivRef} />
    </div>
  );
}
