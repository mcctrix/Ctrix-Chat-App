import { useRef, useContext } from "react";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

import AppContext from "../GlobalStore/Context";

import styles from "../../styles/MsgSendUI.module.css";
import classes from "../GlobalStore/GlobalStyles.module.css";

// import GiffIcon from "./GiffIcon";
// import GiffsDiv from "../Comp_Parts/ChatRoom/MsgSendUI/GiffsDiv";

export default function MsgSendUI(props) {
  // init
  const context = useContext(AppContext);

  // hooks
  // const [openGif, setopenGif] = useState(false);
  const NewMsgRef = useRef();

  // Function
  // const OpenGif = () => {
  //   setopenGif((value) => !value);
  // };

  const SendMsg = async (event) => {
    const Message = NewMsgRef.current.value;
    NewMsgRef.current.value = "";
    event.preventDefault();
    if (Message === "") {
      return;
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

    await setDoc(LocRef, {
      ChatID: context.activeChat.ChatID,
      id: id,
      Sender: context.Current_UserID,
      text: Message,
      createdAt: serverTimestamp(),
    });
    props.emptydiv.current.scrollIntoView({ smooth: true });
  };
  return (
    <form
      onSubmit={SendMsg}
      className={`${styles.sentmsgform} ${classes.darkerbgcolor} `}
    >
      {/* <div onClick={OpenGif}>
        <div className={styles.GifContainer}></div>
        {/* {openGif && <GiffsDiv />} */}
      {/* <GiffIcon /> */}
      {/* </div> */}
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
