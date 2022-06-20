import { useContext } from "react";
import AppContext from "../../GlobalStore/Context";
import useDevice from "../../Custom_hooks/useDevice";
import usePictures from "../../Custom_hooks/usePictures";

import BackIcon from "../../UI/BackIcon";
// import DotIcon from "../../UI/DotIcon";
// import ChatOptionsDiv from "../../UI/ChatOptionsDiv";

import { HStack, Heading, Image } from "@chakra-ui/react";

export default function ChatRoomHeader() {
  // Init
  // const [ShowOptions, setShowOptions] = useState(false);
  const context = useContext(AppContext);
  const [Placeholder] = usePictures();
  const DEVICE = useDevice();

  // const ShowOptionHandler = () => {
  //   setShowOptions(true);
  // };

  const UserPicObtain =
    context.userNameActiveChat &&
    context?.allUsersData?.find?.(
      (data) => data.NickName === context.userNameActiveChat
    )?.ProfilePicture;

  const UserPic = UserPicObtain ? UserPicObtain : Placeholder;

  const closeCurrentChat = () => {
    context.setopenChat(false);
    context.setactiveChat("");
  };

  return (
    <HStack
      bgColor="hsl(230, 21%, 11%)"
      padding="2"
      w="full"
      justifyContent="space-between"
      boxShadow="md"
      // className={`${classes.textcolor} ${classes.darkerbgcolor} ${styles.header}`}
    >
      <HStack>
        {DEVICE === "Desktop" ? null : (
          <HStack onClick={closeCurrentChat}>
            <BackIcon />
          </HStack>
        )}
        <Image
          alt="User profile"
          src={UserPic}
          boxSize="12"
          borderRadius="50%"
        />
        <Heading>{context.userNameActiveChat}</Heading>
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
