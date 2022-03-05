import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import styles from "../styles/SignIn.module.css";

export default function SignUp() {
  // Init
  const auth = getAuth();
  const Navigate = useNavigate();

  // Hooks
  const [wrongPasswd, setwrongPasswd] = useState(false);

  // Ref
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const SignUp = (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setwrongPasswd(true);
      return;
    }
    setwrongPasswd(false);
    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      confirmPasswordRef.current.value
    );
  };

  const navToSignIn = () => {
    Navigate("/signin");
  };

  return (
    <div className={styles.main}>
      <div className={styles.formdiv}>
        <form className={styles.form} onSubmit={SignUp}>
          <h1>Sign up for Account</h1>

          <input
            name="email"
            className={styles.inputfield}
            type="email"
            placeholder="Email"
            minLength="5"
            ref={emailRef}
            required
          />
          <div>
            <input
              name="password"
              placeholder="Password"
              required
              type="password"
              ref={passwordRef}
              minLength="6"
              className={styles.inputfield}
            />
            {wrongPasswd && (
              <p className={styles.warning}>Please Check your Password</p>
            )}
          </div>
          <div>
            <input
              name="confirm password"
              placeholder="Confirm Password"
              type="password"
              minLength="6"
              ref={confirmPasswordRef}
              required
              className={styles.inputfield}
            />

            {wrongPasswd && (
              <p className={styles.warning}>Please Check your Password</p>
            )}
          </div>
          <button className={styles.subbtn}>Sign Up</button>
        </form>
        <button className={styles.subbtn} onClick={navToSignIn}>
          Log In
        </button>
      </div>
    </div>
  );
}
