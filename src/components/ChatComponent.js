import { useContext } from "react";

import AppContext from "./GlobalStore/Context";

import UserSettings from "../components/UI/UserSettings";

import ChatRoom from "./ChatRoom";
import SideBar from "./SideBar";

import { Container, Heading, Text, HStack } from "@chakra-ui/react";
import useDevice from "./Custom_hooks/useDevice";

export default function ChatComponent() {
  // Inits
  const context = useContext(AppContext);
  const DEVICE = useDevice();

  if (context.firstTimeLogin && !context.Loading) {
    return <UserSettings firstTime={true} />;
  }

  return (
    <HStack spacing="0" bgColor="brand.secondary">
      <SideBar />
      {context.activeChatInit === undefined && DEVICE === "Desktop" && (
        <InActiveChatComponent />
      )}
      {context.activeChatInit && <ChatRoom />}

      {context.DisplayUserSettings && <UserSettings firstTime={false} />}
    </HStack>
  );
}

const InActiveChatComponent = () => {
  return (
    <Container
      maxW="full"
      w="85vw"
      h="100vh"
      m="0"
      p="0"
      // paddingTop="30vh"
      justifyContent="center"
      centerContent
      backgroundColor="brand.chatBackground"
    >
      <Heading size="2xl">Welcome to Ctrix Chats</Heading>
      <Text>Select one of the chats</Text>
    </Container>
  );
};
