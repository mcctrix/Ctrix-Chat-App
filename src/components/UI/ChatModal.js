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
  const [otherPersonData, setOtherPersonData] = useState();

  const UserPicObtain =
    otherPersonData &&
    context.allUsersData?.find?.(
      (data) => data.User_ID === otherPersonData.User_ID
    )?.ProfilePicture;

  const UserPic = UserPicObtain ? UserPicObtain : Placeholder;
  const chatModalName =
    props.data.ChatType === "Group"
      ? props.data.ChatName
      : otherPersonData?.NickName;

  const makeChatActive = () => {
    if (DEVICE === "Mobile") {
      context.setopenChat(true);
    }
    if (props.data.ChatType === "DM") {
      context.setActivePrivateChatOtherUserData(() => {
        return props.data.User1.ID === context.Current_UserID
          ? context.UsersData.find((val) => val.User_ID === props.data.User2.ID)
          : context.UsersData.find(
              (val) => val.User_ID === props.data.User1.ID
            );
      });
    }
    if (props.data.ChatType === "Group") {
      context.setActivePrivateChatOtherUserData(undefined);
    }
    context.setshowGifDiv(false);
    context.setActiveChatInit(props.data);
  };
  useEffect(() => {
    // Setting Name of Chat
    if (props.data.ChatType === "DM") {
      setOtherPersonData(
        props?.data.User1.ID === context?.Current_UserID
          ? context?.UsersData?.find?.(
              (val) => val.User_ID === props.data.User2.ID
            )
          : context?.UsersData?.find?.(
              (val) => val.User_ID === props.data.User1.ID
            )
      );
    }
    if (props.data.ChatType === "Group") {
      setOtherPersonData(props.data.otherPersonData);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // Setting active chat messages in a global store
    if (context?.activeChatInit?.ChatID === props?.data?.ChatID) {
      context.setActiveChatInitMessages([...Messages]);
    }
    // eslint-disable-next-line
  }, [context.activeChatInit?.ChatID, Messages]);

  return (
    <HStack
      padding="1"
      // className={`${styles.main} ${
      //   context?.activeChatInit?.ChatID === props.data.ChatID && classes.activeChatInit
      // }`}
      onClick={makeChatActive}
      // bgColor="inherit"
      bgColor={
        context?.activeChatInit?.ChatID === props.data.ChatID
          ? colorMode === "dark"
            ? "brand.sideBarActiveChatBg"
            : "blackAlpha.100"
          : "initial"
      }
    >
      <HStack>
        <Image
          alt="User profile"
          src={UserPic}
          boxSize="14"
          borderRadius="50%"
          loading="lazy"
          userSelect="none"
        />
        {/* Active Chat Symbol */}
        {/* <div
          className={`${
            context?.activeChatInit?.ChatID === props.data.ChatID &&
            classes.activeChatInitHeader
          }`}
        ></div> */}
      </HStack>
      <VStack alignItems="flex-start">
        <Heading size="md" userSelect="none">
          {chatModalName}
        </Heading>
        {Messages?.[Messages?.length - 1]?.Message === "Gif" ? (
          <Text userSelect="none">Gif</Text>
        ) : (
          <Text userSelect="none">
            {Messages?.[Messages?.length - 1]?.text.substring(0, 25)}
          </Text>
        )}
      </VStack>
      {/* <div className={styles.emptydiv}></div> */}
    </HStack>
  );
}
