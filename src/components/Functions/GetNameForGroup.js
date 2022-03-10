import { useRef, useContext } from "react";
import { v4 as uuid } from "uuid";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import AppContext from "../GlobalStore/Context";

import styles from "../../styles/GetNickName.module.css";

export default function GetNameForGroup(prop) {
  // Inits
  const db = getFirestore();
  const context = useContext(AppContext);
  const NameRef = useRef();

  const SendData = (e) => {
    e.preventDefault();
    if (NameRef.current.value === "") return;
    const ID = uuid();
    const MsgRef = doc(db, "Group_Chat_init", ID);
    if (context.groupChatList.length === 0) {
      return;
    }
    let NumOfUsers = [context.Current_UserID];
    let Data = {
      User1: {
        ID: context.Current_UserID,
      },
    };
    for (const user in context.groupChatList) {
      Data = {
        ...Data,
        ["User" + (parseInt(user) + 2)]: {
          ID: context.groupChatList[user].ID,
        },
      };
      NumOfUsers.push(context.groupChatList[user].ID);
    }

    Data = {
      ChatName: NameRef.current.value,
      ChatID: ID,
      ChatType: "Group",
      ChatUserID: NumOfUsers,
      ...Data,
    };

    setDoc(MsgRef, Data);
    prop.togglevis(false);
    context.setuserNameActiveChat(NameRef.current.value);
    context.setactiveChat(Data);
    context.setnewPersonaddbtn(false);
  };
  return (
    <div className={styles.main}>
      {/* <h1>Enter Group Chat Name:</h1> */}
      <form onSubmit={SendData}>
        <label>Enter Group Chat Name: </label>
        <input min="3" ref={NameRef} />
        <button>Submit</button>
      </form>
    </div>
  );
}
