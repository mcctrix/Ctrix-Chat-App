import React, { useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import usePMInit from "../components/Custom_hooks/usePMInit";

import ChatComponent from "../components/ChatComponent";

import UserEntryCheck from "../components/Functions/UserEntryCheck";

import useInitialiseContextData from "../components/Functions/useInitialiseContextData";

export default function Home() {
  // init
  useInitialiseContextData();
  usePMInit();

  const Navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        Navigate("/signin");
      }
    });
  });

  return (
    <>
      <UserEntryCheck />
      <ChatComponent />
    </>
  );
}
