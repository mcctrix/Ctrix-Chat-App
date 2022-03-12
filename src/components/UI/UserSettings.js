import { useState, useRef, useContext } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import usePictures from "../Custom_hooks/usePictures";

import { doc, setDoc } from "firebase/firestore";
import AppContext from "../GlobalStore/Context";
import { db, storage } from "../firebase/firebase";

import styles from "../../styles/GetNickName.module.css";

export default function UserSettings(props) {
  // Initialise
  const [, boy, boy2, girl, girl2] = usePictures();

  const context = useContext(AppContext);

  const [image, setimage] = useState("");
  const [UserID, setUserID] = useState("");
  const [SelectedAvatar, setSelectedAvatar] = useState("");
  const [CustomPicture, setCustomPicture] = useState("");
  const [clickUpload, setclickUpload] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const NameRef = useRef(null);
  const UploadRef = useRef(null);

  if (UserID === "") {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setUserID(user.uid);
      }
    });
  }

  const SelectAvatar = (event) => {
    setSelectedAvatar(event.target.value);
  };

  const UploadFile = (e) => {
    e.preventDefault();
    setclickUpload(false);
    if (!image) return;
    const storageRef = ref(storage, `profilepicture/${image.name}`);
    uploadBytesResumable(storageRef, image)
      .then((snap) => setUploadSuccess(true))
      .then(() => {
        getDownloadURL(storageRef).then((url) => {
          setCustomPicture(url);
        });
      });
  };
  const CancelSettings = () => {
    context.setDisplayUserSettings(false);
  };

  const SendData = (e) => {
    e.preventDefault();
    if (SelectedAvatar === "other" && !CustomPicture && !uploadSuccess) {
      setclickUpload(true);
      return;
    }
    if (!uploadSuccess && SelectedAvatar === "other") {
      return;
    }
    if (NameRef) {
      setDoc(doc(db, "User_Data", UserID), {
        User_ID: UserID,
        NickName:
          NameRef.current.value === ""
            ? context.Current_UserName
            : NameRef.current.value,
        ProfilePicture:
          SelectedAvatar === "other" ? CustomPicture : SelectedAvatar,
      });
    }
    context.setCurrent_UserName(NameRef.current.value);
    context.setCurrent_UserData({
      User_ID: UserID,
      NickName:
        NameRef.current.value === ""
          ? context.Current_UserName
          : NameRef.current.value,
      ProfilePicture:
        SelectedAvatar === "other" ? CustomPicture : SelectedAvatar,
    });
    context.setDisplayUserSettings(false);
  };
  return (
    <div className={styles.main}>
      {props.Firsttime && (
        <h1 className={styles.title}>Welcome to the Ctrix Chats</h1>
      )}
      <form onSubmit={SendData}>
        {props.Firsttime ? (
          <label>Enter Your nickname: </label>
        ) : (
          <label>Enter Your nickname, if you want to change it: </label>
        )}
        <input min="4" ref={NameRef} required={props.Firsttime} />
        <label>Choose Avatar for your profile: </label>
        <div className={styles.avatardiv}>
          <section className={styles.avatarsection}>
            <input
              required
              type="radio"
              id="boy"
              name="avatar"
              value={boy}
              onChange={SelectAvatar}
            />
            <label htmlFor="boy">
              <img className={styles.avatar} src={boy} alt="boy avatar" />
            </label>
          </section>
          <section className={styles.avatarsection}>
            <input
              required
              type="radio"
              id="boy2"
              name="avatar"
              value={boy2}
              onChange={SelectAvatar}
            />
            <label htmlFor="boy2">
              <img className={styles.avatar} src={boy2} alt="boy2 avatar" />
            </label>
          </section>
          <section className={styles.avatarsection}>
            <input
              required
              type="radio"
              id="girl"
              name="avatar"
              value={girl}
              onChange={SelectAvatar}
            />
            <label htmlFor="girl">
              <img className={styles.avatar} src={girl} alt="girl avatar" />
            </label>
          </section>
          <section className={styles.avatarsection}>
            <input
              required
              id="girl2"
              type="radio"
              name="avatar"
              value={girl2}
              onChange={SelectAvatar}
            />
            <label htmlFor="girl2">
              <img className={styles.avatar} src={girl2} alt="girl2 avatar" />
            </label>
          </section>
          <section className={styles.avatarsection}>
            <input
              required
              id="other"
              type="radio"
              name="avatar"
              value="other"
              onChange={SelectAvatar}
            />
            <label htmlFor="other">Other</label>
          </section>
        </div>
        {SelectedAvatar === "other" && (
          <div>
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              ref={UploadRef}
              onChange={(e) => setimage(e.target.files[0])}
              required
            ></input>
            <button onClick={UploadFile}>Upload</button>
            {clickUpload && !uploadSuccess && (
              <p>Click upload to upload your picture.</p>
            )}
            {uploadSuccess && <p>Uploaded Successfully</p>}
          </div>
        )}
        <div>
          <button className={styles.btns}>Submit</button>
          {!props.Firsttime && (
            <button className={styles.btns} onClick={CancelSettings}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
