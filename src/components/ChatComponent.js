import { useContext } from "react";

import AppContext from "./GlobalStore/Context";

import UserSettings from "../components/UI/UserSettings";

import ChatRoom from "./ChatRoom";
import SideBar from "./SideBar";

import { HStack } from "@chakra-ui/react";

export default function ChatComponent() {
  // Inits
  const context = useContext(AppContext);

  return (
    <HStack spacing="0">
      <SideBar />
      <ChatRoom />
      {!context.Current_UserName && !context.Loading && (
        <UserSettings Firsttime={true} />
      )}
      {context.DisplayUserSettings && <UserSettings />}
    </HStack>
  );
}
