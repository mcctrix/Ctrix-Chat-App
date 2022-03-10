import { useContext, useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { isMobile } from "react-device-detect";

import AppContext from "../../../GlobalStore/Context";
import styles from "../../../../styles/AddChatPerson.module.css";

import { getFirestore, doc, setDoc } from "firebase/firestore";

export default function AddChatPerson(props) {
  // Inits
  const context = useContext(AppContext);
  const db = getFirestore();

  // Hooks
  const [isChecked, setisChecked] = useState(false);

  useEffect(() => {
    // For group chat
    if (isChecked) {
      context.setgroupChatList((list) => {
        if (list?.length > 0) {
          return [
            ...list,
            {
              ID: props.user.User_ID,
            },
          ];
        }
        return [
          {
            ID: props.user.User_ID,
          },
        ];
      });
    }
    if (!isChecked) {
      if (context.groupChatList.length > 0) {
        context.setgroupChatList((list) =>
          list.filter((val) => {
            if (val.ID === props.user.User_ID) {
              return false;
            }
            return true;
          })
        );
      }
    }
  }, [isChecked, props, context]);

  const ClickEvent = async () => {
    if (props.GroupMode) return;
    const ID = uuid();
    const MsgRef = doc(db, "Private_Chat_init", ID);

    // We filter all the group chat inits
    const SecPersonNames = context.privateChatInit.filter(
      (data) => data.ChatType === "DM"
    );

    // Check if Chat with other person already exists

    const IfChatExist = SecPersonNames.findIndex(
      (data) =>
        data.User1.ID === props.user.User_ID ||
        data.User2.ID === props.user.User_ID
    );

    if (
      SecPersonNames.some(
        (data) =>
          data.User1.ID === props.user.User_ID ||
          data.User2.ID === props.user.User_ID
      )
    ) {
      const Chat = SecPersonNames[IfChatExist];

      if (isMobile) {
        context.setopenChat(true);
      }

      context.setuserNameActiveChat(props.user.NickName);
      context.setnewPersonaddbtn(false);
      context.setactiveChat(Chat);
      return;
    }

    // Adding new chat
    const DATA = {
      ChatID: ID,
      ChatType: "DM",
      User1: { ID: props.user.User_ID },
      User2: { ID: context.Current_UserID },
    };
    setDoc(MsgRef, DATA);
    if (isMobile) {
      context.setopenChat(true);
    }
    context.setnewPersonaddbtn(false);
    context.setuserNameActiveChat(props.user.NickName);
    context.setactiveChat(DATA);
  };

  return (
    <li className={styles.item} onClick={ClickEvent}>
      {props.GroupMode && (
        <input
          checked={isChecked}
          onChange={() => setisChecked((val) => !val)}
          className={styles.chkbox}
          type="checkbox"
        />
      )}
      {props.user.NickName}
    </li>
  );
}
