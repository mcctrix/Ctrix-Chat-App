import { useEffect, useContext } from "react";

import { onSnapshot, collection, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";

import AppContext from "../GlobalStore/Context";

function useChatInit() {
  const context = useContext(AppContext);
  // Ref
  const PMREF = collection(db, "Private_Chat_init");

  useEffect(() => {
    // Retrieving Private Chatroom details or chat initiase information related to current user
    // let ChatInitsFetched;
    onSnapshot(
      query(
        PMREF,
        where("ChatUserID", "array-contains", context.Current_UserID)
      ),
      (snapshot) => {
        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          //  Filter Older Version of Chat
          context.setChatInit((chat) =>
            chat.filter((arr) => arr.ChatID !== data.ChatID)
          );
          context.setChatInit((value) => [...value, data]);
        });
      }
    );
    // onSnapshot(
    //   query(PMREF, where("User2.ID", "==", context.Current_UserID)),
    //   (snapshot) => {
    //     snapshot.docs.forEach((doc) => {
    //       const data = doc.data();
    //       context.setChatInit((chat) =>
    //         chat.filter((arr) => arr.ChatID !== data.ChatID)
    //       );
    //       context.setChatInit((value) => [...value, data]);
    //     });
    //   }
    // );

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

          context.setChatInit((chat) =>
            chat.filter((arr) => arr.ChatID !== data.ChatID)
          );
          context.setChatInit((value) => [...value, data]);
        });
        context.setLoading(false);
      }
    );

    // eslint-disable-next-line
  }, [db, context.Current_UserData]);
  return null;
}

export default useChatInit;
