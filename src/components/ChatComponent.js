import { useContext } from "react";

import AppContext from "./GlobalStore/Context";

import UserSettings from "../components/UI/UserSettings";

import ChatRoom from "./ChatRoom";
import SideBar from "./SideBar";

import { HStack } from "@chakra-ui/react";
import InActiveChatComponent from "./UI/InActiveChatComponent";
import useDevice from "./Custom_hooks/useDevice";

export default function ChatComponent() {
  // Inits
  const context = useContext(AppContext);
  const DEVICE = useDevice();

  if (context.firstTimeLogin && !context.Loading) {
    return <UserSettings Firsttime={true} />;
  }

  return (
    <HStack spacing="0">
      <SideBar />
      {context.activeChatInit === undefined && DEVICE === "Desktop" && (
        <InActiveChatComponent />
      )}
      {context.activeChatInit && <ChatRoom />}

      {context.DisplayUserSettings && <UserSettings />}
    </HStack>
  );
}
