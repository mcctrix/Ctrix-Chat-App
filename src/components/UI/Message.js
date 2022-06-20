import { useContext } from "react";
import AppContext from "../GlobalStore/Context";
import usePictures from "../Custom_hooks/usePictures";
import Gif from "./GifComp";

import {
  HStack,
  VStack,
  Image,
  Heading,
  Text,
  Container,
  useColorMode,
} from "@chakra-ui/react";

const Message = (props) => {
  // Init
  const context = useContext(AppContext);
  const [Placeholder] = usePictures();
  const { colorMode } = useColorMode();

  const UserObtain =
    context.allUsersData &&
    context?.allUsersData?.find?.((data) => data.User_ID === props.data.Sender);

  const UserPic = UserObtain.ProfilePicture
    ? UserObtain.ProfilePicture
    : Placeholder;
  return (
    <VStack
      // className={`${styles.main} ${
      //   context.Current_UserID === props.data.Sender && classes.alignright
      // }`}
      alignSelf={
        context.Current_UserID === props.data.Sender ? "flex-end" : "flex-start"
      }
      alignItems="center"
      // bgcolor="red"
    >
      {context.Current_UserID !== props.data.Sender && (
        <Heading size="sm">{UserObtain.NickName}</Heading>
      )}
      <HStack>
        {context.Current_UserID !== props.data.Sender && (
          <Image
            // className={`${styles.senderPhoto} ${styles.leftphoto}`}
            alt="User profile"
            src={UserPic}
            boxSize="10"
            borderRadius="50%"
          />
        )}
        {props.data.Message === "Gif" ? (
          <Gif GIF={props.data.Gif} />
        ) : (
          <Container
            // className={`${
            //   context.Current_UserID === props.data.Sender
            //     ? classes.msgalignright
            //     : classes.messageleft
            // } ${styles.message}`}
            key={props.data.id}
            bgColor={colorMode === "light" ? "facebook.100" : "facebook.800"}
            padding="3"
            borderRadius="lg"
          >
            <Text>
              {props.data.text}
              {/* <div className={styles.hovertext}>
              {context.UsersData &&
                context?.allUsersData?.find?.(
                  (data) => data.User_ID === props.data.Sender
                  )?.NickName}
                </div> */}
            </Text>
          </Container>
        )}
      </HStack>
      {/* {context.Current_UserID === props.data.Sender && (
        <img
          className={`${styles.senderPhoto} ${styles.rightphoto}`}
          alt="User profile"
          src={
            context?.Current_UserData?.[0]?.ProfilePicture
              ? context?.Current_UserData?.[0]?.ProfilePicture
              : Placeholder
          }
        ></img>
      )} */}
    </VStack>
  );
};

export default Message;
