import { useContext } from "react";
import { v4 as uuid } from "uuid";

import AppContext from "../../../GlobalStore/Context";

import { getFirestore, doc, setDoc } from "firebase/firestore";

export default function AddChatPerson(props) {
  const context = useContext(AppContext);
  const db = getFirestore();

  const ClickEvent = async () => {
    const ID = uuid();
    const MsgRef = doc(db, "Private_Chat_init", ID);

    // People's ID with which we already have a chat
    const SecPersonNames = context.privateChatInit.map((data) => {
      if (data.User1.ID === context.Current_UserID) {
        return [data.User2.ID, data.ID];
      }
      return [data.User1.ID, data.ID];
    });

    // Check if Chat with other person already exists
    if (SecPersonNames.some((data) => data.includes(props.user.User_ID))) {
      const ChatID = SecPersonNames.find((el) => {
        if (el[0] === props.user.User_ID) {
          return el[1];
        }
      });

      context.setuserNameActiveChat(props.user.NickName);
      context.setnewPersonaddbtn(false);
      context.setactiveChat(ChatID[1]);
      return;
    }

    // Adding new chat
    setDoc(MsgRef, {
      ID: ID,
      User1: { Name: props.user.NickName, ID: props.user.User_ID },
      User2: { Name: context.Current_UserName, ID: context.Current_UserID },
    });
    context.setnewPersonaddbtn(false);
    context.setuserNameActiveChat(props.user.NickName);
    context.setactiveChat(ID);
  };

  return <li onClick={ClickEvent}>{props.user.NickName}</li>;
}
