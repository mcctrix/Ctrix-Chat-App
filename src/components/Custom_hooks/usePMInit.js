import { useEffect, useContext } from "react";

import {
  onSnapshot,
  collection,
  query,
  where,
  getFirestore,
} from "firebase/firestore";

import AppContext from "../GlobalStore/Context";

function usePMInit() {
  const db = getFirestore();
  const context = useContext(AppContext);

  useEffect(() => {
    // Ref
    const PMREF = collection(db, "Private_Chat_init");

    // Retrieving Private Chatroom details related to current user

    onSnapshot(
      query(PMREF, where("User1.ID", "==", context.Current_UserID)),
      (snapshot) => {
        // Filter Chat If User1 Of that chat is not our current user
        // context.setprivateChatInit((data) =>
        //   data.filter((arr) => arr.User1.ID !== context.Current_UserID)
        // );

        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          //  Filter Older Version of Chat
          context.setprivateChatInit((chat) =>
            chat.filter((arr) => arr.ChatID !== data.ChatID)
          );
          context.setprivateChatInit((value) => [...value, data]);
        });
      }
    );
    onSnapshot(
      query(PMREF, where("User2.ID", "==", context.Current_UserID)),
      (snapshot) => {
        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          context.setprivateChatInit((chat) =>
            chat.filter((arr) => arr.ChatID !== data.ChatID)
          );
          context.setprivateChatInit((value) => [...value, data]);
        });
      }
    );

    // Group Chat

    const GroupChatRef = collection(db, "Group_Chat_init");

    onSnapshot(
      query(
        GroupChatRef,
        where("ChatUserID", "array-contains", context.Current_UserID)
      ),
      (snapshot) => {
        snapshot.docs.forEach((doc) => {
          const data = doc.data();

          context.setprivateChatInit((chat) =>
            chat.filter((arr) => arr.ChatID !== data.ChatID)
          );
          context.setprivateChatInit((value) => [...value, data]);
        });
      }
    );

    // eslint-disable-next-line
  }, [db, context.Current_UserName]);
  return null;
}

export default usePMInit;
