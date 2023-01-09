import { useContext, useRef, useLayoutEffect } from "react";

import useDevice from "./Custom_hooks/useDevice";

import AppContext from "./GlobalStore/Context";
import Message from "./UI/Message";
import MsgSendUI from "./UI/MsgSendUI";

import { VStack, HStack, Heading, Image, useColorMode } from "@chakra-ui/react";

import usePictures from "./Custom_hooks/usePictures";
import BackIcon from "./UI/icons/BackIcon";

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

const ChatRoomHeader = () => {
  // Init
  // const [ShowOptions, setShowOptions] = useState(false);
  const context = useContext(AppContext);
  const [Placeholder] = usePictures();
  const DEVICE = useDevice();
  const { colorMode } = useColorMode();

  // const ShowOptionHandler = () => {
  //   setShowOptions(true);
  // };
  const headerName =
    context.activeChatInit.ChatType === "Group"
      ? context.activeChatInit.ChatName
      : context.activePrivateChatOtherUserData.NickName;

  // const UserPicObtain =
  //   context.activePrivateChatOtherUserData &&
  //   context?.allUsersData?.find?.(
  //     (data) => data.NickName === context.activePrivateChatOtherUserData
  //   )?.ProfilePicture;
  // console.log(UserPicObtain);
  // console.log(context.activePrivateChatOtherUserData);

  // const UserPic = UserPicObtain ? UserPicObtain : Placeholder;

  const closeCurrentChat = () => {
    context.setopenChat(false);
    context.setActiveChatInit(undefined);
  };

  return (
    <HStack
      padding="2"
      w="full"
      justifyContent="space-between"
      boxShadow="md"
      position="sticky"
      top="0"
      bgColor={colorMode === "light" ? "brand.chatHeader" : "brand.chatHeader"}
      // bgColor={"brand.secondary"}
    >
      <HStack>
        {DEVICE === "Mobile" && (
          <HStack onClick={closeCurrentChat}>
            <BackIcon />
          </HStack>
        )}
        <Image
          alt="User profile"
          src={
            context.activePrivateChatOtherUserData
              ? context.activePrivateChatOtherUserData.ProfilePicture
              : Placeholder
          }
          boxSize={DEVICE === "Desktop" ? "10" : "12"}
          borderRadius="50%"
          userSelect="none"
        />
        <Heading size={DEVICE === "Mobile" ? "lg" : "md"} userSelect="none">
          {headerName}
        </Heading>
      </HStack>
      <HStack>
        {/* <HStack onClick={ShowOptionHandler}>
          <DotIcon />
        </HStack> */}
        <HStack
        // className={`${styles.Optionsdiv} ${
        //   ShowOptions && styles.DisplayOptions
        // }`}
        >
          {/* <ChatOptionsDiv setVisibility={setShowOptions} /> */}
        </HStack>
      </HStack>
    </HStack>
  );
};
