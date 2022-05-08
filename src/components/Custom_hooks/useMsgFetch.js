import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebase";

const useMsgFetch = (props) => {
  // Hooks
  const [Messages, setMessages] = useState([]);

  useEffect(() => {
    if (props?.ChatType === "DM") {
      // Private Chat Fetch
      const DMref = query(
        collection(db, "Messages", "Private_Chats", props.ChatID),
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

    if (props?.ChatType === "Group") {
      // Group Chat Fetch
      const DMref = query(
        collection(db, "Messages", "Group_Chats", props.ChatID),
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
  }, [props.ChatType, props.ChatID]);

  return [Messages];
};

export default useMsgFetch;
