import { useContext, useState, useEffect } from "react";
import AppContext from "../GlobalStore/Context";
import useDevice from "../Custom_hooks/useDevice";
import usePictures from "../Custom_hooks/usePictures";

import useMsgFetch from "../Custom_hooks/useMsgFetch";

import {
  HStack,
  Image,
  Heading,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";

export default function ChatModal(props) {
  // inits
  const [Placeholder] = usePictures();
  const [Messages] = useMsgFetch(props.data);
  const DEVICE = useDevice();
  const context = useContext(AppContext);
  const { colorMode } = useColorMode();

  // Hooks
  const [ChatName, setChatName] = useState("");

  const UserPicObtain =
    ChatName &&
    context?.allUsersData?.find?.((data) => data.NickName === ChatName)
      ?.ProfilePicture;

  const UserPic = UserPicObtain ? UserPicObtain : Placeholder;

  const makeChatActive = () => {
    if (DEVICE === "Mobile") {
      context.setopenChat(true);
    }
    context.setshowGifDiv(false);
    context.setuserNameActiveChat(() => {
      if (props.data.ChatType === "Group") {
        return props.data.ChatName;
      }
      return props.data.User1.ID === context.Current_UserID
        ? context.UsersData.find((val) => val.User_ID === props.data.User2.ID)
            .NickName
        : context.UsersData.find((val) => val.User_ID === props.data.User1.ID)
            .NickName;
    });
    context.setactiveChat(props.data);
  };
  useEffect(() => {
    // Setting Name of Chat
    if (props.data.ChatType === "DM") {
      setChatName(
        props.data.User1.ID === context.Current_UserID
          ? context?.UsersData?.find?.(
              (val) => val.User_ID === props.data.User2.ID
            ).NickName
          : context?.UsersData?.find?.(
              (val) => val.User_ID === props.data.User1.ID
            ).NickName
      );
    }
    if (props.data.ChatType === "Group") {
      setChatName(props.data.ChatName);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // Setting active chat messages in a global store
    if (context.activeChat.ChatID === props.data.ChatID) {
      context.setactiveChatData([...Messages]);
    }
    // eslint-disable-next-line
  }, [context.activeChat.ChatID, Messages]);

  return (
    <HStack
      padding="1"
      // className={`${styles.main} ${
      //   context?.activeChat?.ChatID === props.data.ChatID && classes.activechat
      // }`}
      onClick={makeChatActive}
      // bgColor="inherit"
      bgColor={
        context?.activeChat?.ChatID === props.data.ChatID
          ? colorMode === "dark"
            ? "hsl(230, 21%, 21%)"
            : "blackAlpha.100"
          : "inherit"
      }
    >
      <HStack>
        <Image
          alt="User profile"
          src={UserPic}
          boxSize="14"
          borderRadius="50%"
          loading="lazy"
        />
        {/* Active Chat Symbol */}
        {/* <div
          className={`${
            context?.activeChat?.ChatID === props.data.ChatID &&
            classes.activeChatHeader
          }`}
        ></div> */}
      </HStack>
      <VStack alignItems="flex-start">
        <Heading size="md">{ChatName}</Heading>
        {Messages?.[Messages?.length - 1]?.Message === "Gif" ? (
          <Text>Gif</Text>
        ) : (
          <Text>{Messages?.[Messages?.length - 1]?.text.substring(0, 25)}</Text>
        )}
      </VStack>
      {/* <div className={styles.emptydiv}></div> */}
    </HStack>
  );
}
