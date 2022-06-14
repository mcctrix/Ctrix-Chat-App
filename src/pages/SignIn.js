import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import styles from "../styles/SignIn.module.css";
import LoginInIcon from "../components/UI/LogInIcon";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

export default function Signin() {
  const Navigate = useNavigate();
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        Navigate("/main");
      }
    });
    // eslint-disable-next-line
  }, [auth]);
  const NavToSignUp = () => {
    Navigate("/signup");
  };
  const SignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((cred) => {
        console.log("Log in successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const SignInWithEmailPassword = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, userName, password);
  };
  return (
    <div className={styles.main}>
      <div className={styles.formdiv}>
        <form className={styles.form} onSubmit={SignInWithEmailPassword}>
          <LoginInIcon />
          <h1>Login into your account</h1>
          <input
            className={styles.inputfield}
            name="name"
            placeholder="Username"
            onChange={(e) => setuserName(e.target.value)}
            value={userName}
            required
          />
          <input
            className={styles.inputfield}
            name="password"
            placeholder="Password"
            required
            onChange={(e) => setpassword(e.target.value)}
            value={password}
            type="password"
          />
          <button className={styles.subbtn}>Log In</button>
        </form>
        <button className={styles.subbtn} onClick={NavToSignUp}>
          Sign Up
        </button>
        <button className={styles.googlelogin} onClick={SignInWithGoogle}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
