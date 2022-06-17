import { useRef, useContext } from "react";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

import AppContext from "../GlobalStore/Context";

import styles from "../../styles/MsgSendUI.module.css";
import classes from "../GlobalStore/GlobalStyles.module.css";

import GiffIcon from "./GiffIcon";
import GiffsDiv from "../Comp_Parts/ChatRoom/MsgSendUI/GiffsDiv";

export default function MsgSendUI(props) {
  // init
  const context = useContext(AppContext);

  // hooks
  const NewMsgRef = useRef();

  // Function
  const OpenGif = () => {
    context.setshowGifDiv((state) => !state);
  };

  const SendMsg = (data) => {
    let Message;
    if (data.type === "text") {
      data.event.preventDefault();
      Message = NewMsgRef.current.value;
      NewMsgRef.current.value = "";
      if (Message === "") {
        return;
      }
    }
    const id = Date.now().toString();
    let LocRef;
    if (context.activeChat.ChatType === "DM") {
      LocRef = doc(
        db,
        "Messages",
        "Private_Chats",
        context.activeChat.ChatID,
        id
      );
    }
    if (context.activeChat.ChatType === "Group") {
      LocRef = doc(
        db,
        "Messages",
        "Group_Chats",
        context.activeChat.ChatID,
        id
      );
    }
    //

    const MsgObj = {
      ChatID: context.activeChat.ChatID,
      id: id,
      Sender: context.Current_UserID,
      createdAt: serverTimestamp(),
    };
    if (data.type === "text") {
      setDoc(LocRef, {
        ...MsgObj,
        text: Message,
        Message: "Normal",
      });
    }
    if (data.type === "Gif") {
      setDoc(LocRef, {
        ...MsgObj,
        Message: "Gif",
        Gif: data.GifID,
      });
    }

    // props.emptydiv.current.scrollIntoView({ smooth: true });
  };
  return (
    <form
      onSubmit={(event) => {
        SendMsg({
          type: "text",
          event: event,
        });
      }}
      id="MsgSendUI"
      className={`${styles.sentmsgform} ${classes.darkerbgcolor} `}
    >
      <div id="GifDiv">
        {context.showGifDiv && (
          <div className={styles.GifContainer}>
            <GiffsDiv MsgSendHandler={SendMsg} />
          </div>
        )}
        <div onClick={OpenGif}>
          <GiffIcon />
        </div>
      </div>
      <input
        className={`${classes.inputTextColor} ${styles.sentForm}`}
        placeholder="Type your message.."
        ref={NewMsgRef}
      />
      <button
        className={`${classes.MsgSentBtnActive}  ${classes.bgcolor} ${classes.textcolor} ${styles.sentBtn}`}
      >
        Send
      </button>
    </form>
  );
}
