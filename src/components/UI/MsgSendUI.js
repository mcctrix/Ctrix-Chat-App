import { useRef, useContext } from "react";
import { getFirestore, setDoc, doc, serverTimestamp } from "firebase/firestore";

import AppContext from "../GlobalStore/Context";

import styles from "../../styles/MsgSendUI.module.css";

// import GiffIcon from "./GiffIcon";
// import GiffsDiv from "../Comp_Parts/ChatRoom/MsgSendUI/GiffsDiv";

export default function MsgSendUI(props) {
  // init
  const context = useContext(AppContext);

  // hooks
  // const [openGif, setopenGif] = useState(false);
  const NewMsgRef = useRef();

  // Database
  const db = getFirestore(); // Database

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
    await setDoc(doc(db, "Messages", "Private_Chats", context.activeChat, id), {
      ChatID: context.activeChat,
      id: id,
      Sender: context.Current_UserID,
      text: Message,
      createdAt: serverTimestamp(),
    });
    props.emptydiv.current.scrollIntoView({ smooth: true });
  };
  return (
    <form onSubmit={SendMsg} className={styles.sentmsgform}>
      {/* <div onClick={OpenGif}>
        <div className={styles.GifContainer}></div>
        {/* {openGif && <GiffsDiv />} */}
      {/* <GiffIcon /> */}
      {/* </div> */}
      <input placeholder="Type your message.." ref={NewMsgRef} />
      <button>Send</button>
    </form>
  );
}
