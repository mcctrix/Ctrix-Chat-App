import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import Signin from "./pages/SignIn";

import Home from "./pages/Home";

// Hooks
import { Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";

const Cred = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(Cred);
getAuth(app);

export default function App() {
  console.log();
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate replace to="signin" />} />
        <Route path="/main" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}
