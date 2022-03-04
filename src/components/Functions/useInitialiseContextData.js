import { useEffect, useContext, useState } from "react";

import { getFirestore, collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { onAuthStateChanged, getAuth } from "firebase/auth";

import AppContext from "../GlobalStore/Context";

export default function useInitialiseContextData() {
  const db = getFirestore();
  const context = useContext(AppContext);

  // States
  const [Current_UserID, setCurrent_UserID] = useState("");

  // Collection and Document Reference
  const allUsersData_Ref = collection(db, "User_Data");

  const [allUsersData, loading, error] = useCollectionData(allUsersData_Ref);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (Current_UserID === "") {
      onAuthStateChanged(getAuth(), (user) => {
        if (user) {
          context.setCurrent_UserID(user.uid);
          setCurrent_UserID(user.uid);
        } else {
          return;
        }
      });
    }
    // Retrieve data and set it to hooks in context
    if (!loading) {
      const CurrentUserData = allUsersData.filter(
        (user) => user.User_ID === Current_UserID
      );
      const allUserDataExceptCurrentUser = allUsersData.filter(
        (user) => user.User_ID !== Current_UserID
      );
      // All users data
      context.setallUserData(allUsersData);
      // User Data Except current user
      context.setUsersData(allUserDataExceptCurrentUser);
      // Current logged in user data
      if (CurrentUserData[0]) {
        context.setCurrent_UserName(CurrentUserData[0].NickName);
        context.setCurrent_UserData(CurrentUserData);
      }
    }

    // eslint-disable-next-line
  }, [loading, db, Current_UserID, allUsersData, error]);

  return null;
}
