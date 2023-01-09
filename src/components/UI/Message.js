import { useContext } from "react";
import AppContext from "../GlobalStore/Context";
import usePictures from "../Custom_hooks/usePictures";

import {
  HStack,
  VStack,
  Image,
  Text,
  Container,
  useColorMode,
} from "@chakra-ui/react";

import useDevice from "../Custom_hooks/useDevice";

import { useState, useEffect } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { Gif } from "@giphy/react-components";

const Message = (props) => {
  // Init
  const context = useContext(AppContext);
  const [Placeholder] = usePictures();
  const { colorMode } = useColorMode();
  const DEVICE = useDevice();

  const UserObtain =
    context.allUsersData &&
    context?.allUsersData?.find?.((data) => data.User_ID === props.data.Sender);

  const UserPic = UserObtain.ProfilePicture
    ? UserObtain.ProfilePicture
    : Placeholder;
  return (
    <VStack
      alignSelf={
        context.Current_UserID === props.data.Sender ? "flex-end" : "flex-start"
      }
      alignItems="flex-start"
    >
      <HStack spacing={DEVICE === "Mobile" ? "1" : "2"}>
        {context.Current_UserID !== props.data.Sender && (
          <Image
            // className={`${styles.senderPhoto} ${styles.leftphoto}`}
            alt="User profile"
            src={UserPic}
            boxSize="10"
            borderRadius="50%"
            alignSelf="flex-end"
            p="0"
            userSelect="none"
          />
        )}
        {props.data.Message === "Gif" ? (
          <Container padding="3" userSelect="none">
            <GifComp GIF={props.data.Gif} />
          </Container>
        ) : (
          <Container
            key={props.data.id}
            bgColor={
              context.Current_UserID === props.data.Sender
                ? colorMode === "light"
                  ? "cyan.700"
                  : "brand.currentUserMessageBg"
                : colorMode === "light"
                ? "facebook.700"
                : "brand.otherUserMessageBg"
            }
            padding="3"
            m="0 0 0 16px"
            borderRadius="lg"
          >
            <Text
              color={
                context.Current_UserID === props.data.Sender
                  ? "brand.currentUserMessageTextColor"
                  : "brand.otherUserMessageTextColor"
              }
            >
              {props.data.text}
            </Text>
          </Container>
        )}
      </HStack>
    </VStack>
  );
};

const GifComp = ({ GIF }) => {
  const DEVICE = useDevice();
  const [gif, setGif] = useState(null);
  useEffect(() => {
    const giphyF = new GiphyFetch(process.env.REACT_APP_GIPHY_API_KEY);
    const fetchFunction = async () => {
      const { data } = await giphyF.gif(GIF);
      setGif(data);
    };
    fetchFunction();
  }, [GIF]);
  return (
    <Container p="0" width={DEVICE === "Mobile" ? 200 : 300}>
      {gif && <Gif gif={gif} width={DEVICE === "Mobile" ? 200 : 300} />}
    </Container>
  );
};

export default Message;
