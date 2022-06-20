import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebase";

const useMsgFetch = ({ ChatType, ChatID }) => {
  // Hooks
  const [Messages, setMessages] = useState([]);

  useEffect(() => {
    if (ChatType === "DM") {
      // Private Chat Fetch
      const DMref = query(
        collection(db, "Messages", "Private_Chats", ChatID),
        orderBy("createdAt")
        // ,limitToLast(20)
      );
      onSnapshot(DMref, (snapshot) => {
        setMessages([]);
        snapshot.docs.forEach((msg) => {
          setMessages((data) => [...data, msg.data()]);
        });
      });
    }

    if (ChatType === "Group") {
      // Group Chat Fetch
      const DMref = query(
        collection(db, "Messages", "Group_Chats", ChatID),
        orderBy("createdAt")
        // ,limitToLast(25)
      );
      onSnapshot(DMref, (snapshot) => {
        setMessages([]);
        snapshot.docs.forEach((msg) => {
          setMessages((data) => [...data, msg.data()]);
        });
      });
    }

    // end
  }, [ChatType, ChatID]);

  return [Messages];
};

export default useMsgFetch;
