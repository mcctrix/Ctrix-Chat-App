import React, { useContext, useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import ChatComponent from "../components/ChatComponent";

import useInitialiseContextData from "../components/Functions/useInitialiseContextData";
import Loading from "../components/UI/Loading";

import AppContext from "../components/GlobalStore/Context";
import usePMInit from "../components/Custom_hooks/usePMInit";

export default function Home() {
  // init
  const context = useContext(AppContext);
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
      {context.Loading && <Loading />}
      <ChatComponent />
    </>
  );
}
