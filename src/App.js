// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import Signin from "./pages/SignIn";

import Home from "./pages/Home";

// Hooks
import { Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";

// const Development_Backend = {
//   apiKey: process.env.REACT_APP_FIREBASE_DEV_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_DEV_AUTHDOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_DEV_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_DEV_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_DEV_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_DEV_APP_ID,
// };

// const Production_Backend = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };

// const app =
//   process.env.NODE_ENV === "development"
//     ? initializeApp(Development_Backend)
//     : initializeApp(Production_Backend);
// getAuth(app);

export default function App() {
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
