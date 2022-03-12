import { useState, useEffect, useContext } from "react";
import {
  collection,
  onSnapshot,
  query,
  limitToLast,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

import AppContext from "../GlobalStore/Context";

const useMsgFetch = () => {
  // Hooks
  const [Messages, setMessages] = useState([]);

  const context = useContext(AppContext);

  useEffect(() => {
    if (!context.activeChat) {
      setMessages([]);
      return;
    }
    if (context.activeChat.ChatType === "DM") {
      // Private Chat Fetch
      const DMref = query(
        collection(db, "Messages", "Private_Chats", context.activeChat.ChatID),
        orderBy("createdAt"),
        limitToLast(20)
      );
      onSnapshot(DMref, (snapshot) => {
        setMessages([]);
        snapshot.docs.forEach((msg) => {
          setMessages((data) => [...data, msg.data()]);
        });
      });
    }

    if (context.activeChat.ChatType === "Group") {
      // Group Chat Fetch
      const DMref = query(
        collection(db, "Messages", "Group_Chats", context.activeChat.ChatID),
        orderBy("createdAt")
      );
      onSnapshot(DMref, (snapshot) => {
        setMessages([]);
        snapshot.docs.forEach((msg) => {
          setMessages((data) => [...data, msg.data()]);
        });
      });
    }

    // end
  }, [context.activeChat]);

  return [Messages];
};

export default useMsgFetch;
