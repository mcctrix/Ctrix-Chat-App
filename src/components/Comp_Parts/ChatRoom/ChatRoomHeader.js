import { useContext } from "react";
import AppContext from "../../GlobalStore/Context";
import useDevice from "../../Custom_hooks/useDevice";
import usePictures from "../../Custom_hooks/usePictures";

import BackIcon from "../../UI/BackIcon";

import { HStack, Heading, Image, useColorMode } from "@chakra-ui/react";

export default function ChatRoomHeader() {
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
}
