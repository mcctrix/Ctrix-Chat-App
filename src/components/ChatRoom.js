import { useEffect, useContext, useRef } from "react";

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

  useEffect(() => {
    if (context.activeChatData && emptyDivRef) {
      setTimeout(() => {
        emptyDivRef.current.scrollIntoView({ smooth: true });
      }, 600);
    }
  }, [context.activeChatData]);

  const CloseGifDiv = () => {
    if (context.setshowGifDiv) {
      context.setshowGifDiv(false);
    }
  };

  return (
    <VStack
      id="ChatRoom"
      display={DEVICE === "Mobile" && !context.openChat ? "none" : "flex"}
      w="full"
      h="100vh"
      spacing={0}
    >
      <ChatRoomHeader />

      <VStack
        overflowY="scroll"
        id="MessagesDiv"
        onClick={CloseGifDiv}
        h="full"
        w="full"
        alignItems="flex-start"
      >
        {context.activeChatData &&
          context.activeChatData.map((data) => (
            <Message key={data.id} data={data} />
          ))}
        <div ref={emptyDivRef}></div>
      </VStack>
      <MsgSendUI emptydiv={emptyDivRef} />
    </VStack>
  );
}
