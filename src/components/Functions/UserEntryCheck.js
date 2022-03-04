import { useState } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { getFirestore, collection, setDoc, doc } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

import GetNickName from "./GetNickName";

export default function UserEntryCheck() {
  const db = getFirestore();
  const colRef = collection(db, "User_Data");
  const [values] = useCollectionData(colRef);
  const [userExist, setuserExist] = useState(false);
  const [UserID, setUserID] = useState("");
  // console.log(values);
  // if (db && UserID) {
  //   setDoc(doc(db, "User_Data", UserID), {
  //     UserID: UserID,
  //   });
  // }
  if (values && !userExist) {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setuserExist(
          values.some((val) => val.User_ID == user.uid && val.NickName !== "")
        );
        setUserID(user.uid);
      }
    });
  }
  if (!userExist && values && UserID) {
    return <GetNickName />;
  }
  return null;
}
