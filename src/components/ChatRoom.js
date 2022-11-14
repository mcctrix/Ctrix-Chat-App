import { useContext, useRef, useLayoutEffect } from "react";

import useDevice from "./Custom_hooks/useDevice";

// UI and styles
import ChatRoomHeader from "./Comp_Parts/ChatRoom/ChatRoomHeader";

import AppContext from "./GlobalStore/Context";
import Message from "./UI/Message";
import MsgSendUI from "./UI/MsgSendUI";

import { VStack } from "@chakra-ui/react";

export default function ChatRoom() {
  //init
  const context = useContext(AppContext);
  const DEVICE = useDevice();

  // Ref Hooks
  const emptyDivRef = useRef(null);
  const MsgDiv = useRef(null);

  useLayoutEffect(() => {
    if (context?.activeChatInitMessages?.length > 0) {
      if (MsgDiv) {
        console.log(MsgDiv);
      }
      if (emptyDivRef) {
        setTimeout(() => {
          emptyDivRef?.current?.scrollIntoView({ smooth: true });
        }, 100);
      }
    }
    // window.scrollTo(0, document.body.scrollHeight);
    // eslint-disable-next-line
  }, [context.activeChatInitMessages, context]);

  const CloseGifDiv = () => {
    if (context.setshowGifDiv) {
      context.setshowGifDiv(false);
    }
  };

  return (
    <VStack
      id="ChatRoom"
      display={DEVICE === "Mobile" && !context.openChat ? "none" : "flex"}
      w={DEVICE === "Desktop" ? "85vw" : "full"}
      h="100vh"
      spacing={0}
      backgroundColor="brand.chatBackground"
    >
      <ChatRoomHeader />

      <VStack
        overflowY="scroll"
        id="MessagesDiv"
        onClick={CloseGifDiv}
        h="full"
        w="full"
        alignItems="flex-start"
        p="2"
        ref={MsgDiv}
      >
        {context.activeChatInitMessages &&
          context.activeChatInitMessages.map((data) => (
            <Message key={data.id} data={data} />
          ))}
        <div ref={emptyDivRef}></div>
      </VStack>
      <MsgSendUI emptydiv={emptyDivRef} />
    </VStack>
  );
}
