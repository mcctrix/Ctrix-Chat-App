import { useState, useRef, useContext } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import AppContext from "../GlobalStore/Context";

import styles from "../../styles/GetNickName.module.css";

export default function GetNickName() {
  // Initialise
  const db = getFirestore();
  const context = useContext(AppContext);

  const [UserID, setUserID] = useState("");
  const NameRef = useRef();

  if (UserID === "") {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setUserID(user.uid);
      }
    });
  }
  const SendData = (e) => {
    e.preventDefault();
    if (NameRef) {
      setDoc(doc(db, "User_Data", UserID), {
        User_ID: UserID,
        NickName: NameRef.current.value,
      });
    }
    context.setCurrent_UserName(NameRef.current.value);
    context.setCurrent_UserData({
      User_ID: UserID,
      NickName: NameRef.current.value,
    });
    alert("Nickname set");
  };
  console.log("Nickname component running");
  return (
    <div className={styles.main}>
      <h1>Welcome to the Ctrix Chats</h1>
      <form onSubmit={SendData}>
        <label>Enter Your nickname: </label>
        <input min="3" ref={NameRef} />
        <button>Submit</button>
      </form>
    </div>
  );
}
