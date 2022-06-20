import { useRef, useContext } from "react";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

import AppContext from "../GlobalStore/Context";

import GiffIcon from "./GiffIcon";
import GiffsDiv from "../Comp_Parts/ChatRoom/MsgSendUI/GiffsDiv";

import { Button, HStack, Input, Container } from "@chakra-ui/react";
// Prop is related to receiving ref for empty div to scroll to down
export default function MsgSendUI(props) {
  // init
  const context = useContext(AppContext);

  // hooks
  const NewMsgRef = useRef();

  // Function
  const OpenGif = () => {
    context.setshowGifDiv((state) => !state);
  };

  const SendMsg = (data) => {
    let Message;
    if (data.type === "text") {
      Message = NewMsgRef.current.value;
      NewMsgRef.current.value = "";
      if (Message === "") {
        return;
      }
    }
    const id = Date.now().toString();
    let LocRef;
    if (context.activeChat.ChatType === "DM") {
      LocRef = doc(
        db,
        "Messages",
        "Private_Chats",
        context.activeChat.ChatID,
        id
      );
    }
    if (context.activeChat.ChatType === "Group") {
      LocRef = doc(
        db,
        "Messages",
        "Group_Chats",
        context.activeChat.ChatID,
        id
      );
    }
    //

    const MsgObj = {
      ChatID: context.activeChat.ChatID,
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
    <HStack w="full">
      <Container id="GifDiv" p="0" w="3vw">
        {context.showGifDiv && <GiffsDiv MsgSendHandler={SendMsg} />}
        <Container onClick={OpenGif} p="0">
          <GiffIcon />
        </Container>
      </Container>
      <Input placeholder="Type your message.." ref={NewMsgRef} w="full" />
      <Button onClick={() => SendMsg({ type: "text" })}>Send</Button>
    </HStack>
  );
}
