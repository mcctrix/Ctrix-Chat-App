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
  // const [PMInit, setPMInit] = useState([]);

  useEffect(() => {
    // Ref
    const colref = collection(db, "Private_Chat_init");

    // Retrieving Private Chatroom details related to current user
    if (context.Current_UserName) {
      onSnapshot(
        query(colref, where("User1.Name", "==", context.Current_UserName)),
        (snapshot) => {
          context.setprivateChatInit((data) =>
            data.filter((arr) => arr.User1.Name !== context.Current_UserName)
          );

          snapshot.docs.forEach((doc) => {
            context.setprivateChatInit((value) => [...value, doc.data()]);
          });
        }
      );
      onSnapshot(
        query(colref, where("User2.Name", "==", context.Current_UserName)),
        (snapshot) => {
          context.setprivateChatInit((data) =>
            data.filter((arr) => arr.User2.Name !== context.Current_UserName)
          );

          snapshot.docs.forEach((doc) => {
            context.setprivateChatInit((value) => [...value, doc.data()]);
          });
        }
      );
    }
    // eslint-disable-next-line
  }, [db, context.Current_UserName]);
  return null;
}

export default usePMInit;
