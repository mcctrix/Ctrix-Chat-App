import { useEffect, useContext, useRef } from "react";

import useDevice from "./Custom_hooks/useDevice";

// UI and styles
import ChatRoomHeader from "./Comp_Parts/ChatRoom/ChatRoomHeader";
import styles from "../styles/ChatRoom.module.css";

import AppContext from "./GlobalStore/Context";
import Message from "./UI/Message";
import MsgSendUI from "./UI/MsgSendUI";

export default function ChatRoom() {
  //init
  const context = useContext(AppContext);
  const DEVICE = useDevice();

  // Ref Hooks
  const emptyDivRef = useRef(null);

  useEffect(() => {
    if (context.activeChatData && emptyDivRef) {
      setTimeout(() => {
        emptyDivRef.current.scrollIntoView({ smooth: true });
      }, 400);
    }
  }, [context.activeChatData]);

  const CloseGifDiv = () => {
    if (context.setshowGifDiv) {
      context.setshowGifDiv(false);
    }
  };

  return (
    <div
      id="ChatRoom"
      className={`${styles.main} ${
        DEVICE === "Mobile" && !context.openChat && styles.mobchatroom
      }`}
    >
      <ChatRoomHeader />

      <div
        className={styles.messagesdiv}
        id="MessagesDiv"
        onClick={CloseGifDiv}
      >
        {context.activeChatData &&
          context.activeChatData.map((data) => (
            <Message key={data.id} data={data} />
          ))}
        <div ref={emptyDivRef}></div>
      </div>
      <MsgSendUI emptydiv={emptyDivRef} />
    </div>
  );
}
