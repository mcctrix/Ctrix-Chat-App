import { useState, useEffect, useContext } from "react";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  limitToLast,
  orderBy,
} from "firebase/firestore";

import AppContext from "../GlobalStore/Context";

const useMsgFetch = () => {
  // Hooks
  const [Messages, setMessages] = useState([]);

  // Init
  const db = getFirestore();

  const context = useContext(AppContext);

  useEffect(() => {
    if (!context.activeChat) {
      setMessages([]);
      return;
    }
    // Collection Reference
    const colref = query(
      collection(db, "Messages", "Private_Chats", context.activeChat),
      orderBy("createdAt"),
      limitToLast(20)
    );
    onSnapshot(colref, (snapshot) => {
      setMessages([]);
      snapshot.docs.forEach((msg) => {
        setMessages((data) => [...data, msg.data()]);
      });
    });

    // End
  }, [db, context.activeChat]);

  return [Messages];
};

export default useMsgFetch;
