import { useRef, useContext } from "react";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

import AppContext from "../GlobalStore/Context";

import GiffIcon from "./icons/GiffIcon";
import GiffsDiv from "./GiffsDiv";

import { Button, HStack, Input, Container, Stack } from "@chakra-ui/react";
import useDevice from "../Custom_hooks/useDevice";

// Prop is related to receiving ref for empty div to scroll to down

export default function MsgSendUI(props) {
  // init
  const context = useContext(AppContext);
  const DEVICE = useDevice();

  // hooks
  const NewMsgRef = useRef();

  // Function
  const OpenGif = () => {
    context.setshowGifDiv((state) => !state);
  };

  const SendMsg = (data) => {
    let Message;
    if (data.type === "text") {
      data.event?.preventDefault();
      Message = NewMsgRef.current.value;
      NewMsgRef.current.value = "";
      if (Message === "") {
        return;
      }
    }
    const id = Date.now().toString();
    let LocRef;
    if (context.activeChatInit.ChatType === "DM") {
      LocRef = doc(
        db,
        "Messages",
        "Private_Chats",
        context.activeChatInit.ChatID,
        id
      );
    }
    if (context.activeChatInit.ChatType === "Group") {
      LocRef = doc(
        db,
        "Messages",
        "Group_Chats",
        context.activeChatInit.ChatID,
        id
      );
    }
    //

    const MsgObj = {
      ChatID: context.activeChatInit.ChatID,
      id: id,
      Sender: context.Current_UserID,
      createdAt: serverTimestamp(),
    };
    if (data.type === "text") {
      setDoc(LocRef, {
        ...MsgObj,
        text: Message,
        Message: "Normal",
      });
    }
    if (data.type === "Gif") {
      setDoc(LocRef, {
        ...MsgObj,
        Message: "Gif",
        Gif: data.GifID,
      });
    }

    // props.emptydiv.current.scrollIntoView({ smooth: true });
  };
  return (
    <HStack
      w="full"
      padding="1"
      pos="sticky"
      bottom="0"
      // bgColor="brand.primary"
    >
      <Container id="GifDiv" p="0" w={DEVICE === "Mobile" ? "10vw" : "2vw"}>
        {context.showGifDiv && <GiffsDiv MsgSendHandler={SendMsg} />}
        <Container onClick={OpenGif} p="0">
          <GiffIcon />
        </Container>
      </Container>
      <Stack w="full">
        <form
          onSubmit={(e) => {
            SendMsg({ type: "text", event: e });
          }}
        >
          <Input placeholder="Type your message.." ref={NewMsgRef} />
        </form>
      </Stack>
      <Button
        onClick={() => SendMsg({ type: "text" })}
        bgColor="brand.telegramBtn"
        color="white"
      >
        Send
      </Button>
    </HStack>
  );
}
