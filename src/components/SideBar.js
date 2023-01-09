import { useContext, useState } from "react";

import ChatModal from "./UI/ChatModal";
import AddChats from "./Comp_Parts/SideBar/AddChats";

import useDevice from "./Custom_hooks/useDevice";

import AppContext from "./GlobalStore/Context";
import GetNameForGroup from "./Functions/GetNameForGroup";

import {
  Container,
  HStack,
  Button,
  Heading,
  Image,
  Stack,
  List,
  ListItem,
  useColorMode,
} from "@chakra-ui/react";

import { signOut, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import usePictures from "../components/Custom_hooks/usePictures";
import DotIcon from "../components/UI/icons/DotIcon";

export default function SideBar() {
  // Inits

  const DEVICE = useDevice();
  const context = useContext(AppContext);
  // Hooks
  const [nameGroupChat, setnameGroupChat] = useState(false);
  const [makeGroupChatToggler, setMakeGroupBtnToggler] = useState(false);

  const CloseOptionsInSideBarHeader = (event) => {
    window.addEventListener("mouseup", () => {
      if (event.target !== "dropdownmenu") {
        context.setsideBarOptions(false);
      }
    });
  };
  const makeGroupChat = () => {
    if (context.newGroupChatUserList.length === 0) return;
    setnameGroupChat(true);
  };

  return (
    <Container
      h="100vh"
      w={DEVICE === "Mobile" ? "full" : "25vw"}
      // For Mobile making Sidebar disappear so only chat room can be seen on the screen
      display={context.openChat ? "none" : "flex"}
      flexDirection="column"
      borderRight="1px solid black"
      m="0"
      p="0"
      pos="relative"
      onClick={CloseOptionsInSideBarHeader}
      backgroundColor="brand.sideBarBackground"
    >
      {/* SideBar Head */}
      <Container p={"0"} overflowY={"hidden"}>
        {context.newPersonAddBtn ? (
          <SideBarHeader id="new" title="Add People" />
        ) : (
          <SideBarHeader title={context.Current_UserData?.NickName} />
        )}
        {/* Chats and Contacts button stack */}
        <HStack
          pos="sticky"
          top={DEVICE === "Desktop" ? "9vh" : "6vh"}
          marginY="1"
        >
          <Button
            onClick={() => {
              context.setNewPersonAddBtn(false);
              setMakeGroupBtnToggler(false);
            }}
            w="full"
            colorScheme={!context.newPersonAddBtn ? "red" : "telegram"}
            boxShadow="none"
          >
            Chats
          </Button>
          <Button
            onClick={() => context.setNewPersonAddBtn(true)}
            w="full"
            colorScheme={context.newPersonAddBtn ? "red" : "telegram"}
            boxShadow="none"
          >
            Contacts
          </Button>
        </HStack>
        {context.newPersonAddBtn ? (
          <Container
            p={"0"}
            h="85%"
            overflowY={"scroll"}
            css={{ "&::-webkit-scrollbar": { display: "none" } }}
          >
            <AddChats groupBtnToggler={setMakeGroupBtnToggler} />
          </Container>
        ) : (
          <Container
            p={"0"}
            h="85%"
            overflowY={"scroll"}
            css={{ "&::-webkit-scrollbar": { display: "none" } }}
          >
            {context.chatInit?.length > 0 &&
              context.chatInit.map((data) => (
                <ChatModal key={data.ChatID} data={data} />
              ))}
          </Container>
        )}
      </Container>
      {context.newPersonAddBtn && makeGroupChatToggler && (
        <>
          <Button
            pos="absolute"
            bottom="0"
            width="100%"
            onClick={makeGroupChat}
          >
            Make Group
          </Button>
          {nameGroupChat && (
            <GetNameForGroup
              togglevis={setnameGroupChat}
              toggleGroupMakeBtn={setMakeGroupBtnToggler}
            />
          )}
        </>
      )}
    </Container>
  );
}

const SideBarHeader = (props) => {
  // init
  const [Placeholder] = usePictures();
  const {
    colorMode,
    // , toggleColorMode
  } = useColorMode();
  const Navigate = useNavigate();
  const context = useContext(AppContext);
  const auth = getAuth();
  const DEVICE = useDevice();

  const showDropDown = () => {
    context.setsideBarOptions((snap) => !snap);
  };

  const SignOut = () => {
    signOut(auth);
    // context.setCurrent_UserID(null);
    // context.setCurrent_UserData(undefined);
    // context.setUsersData(undefined);
    // context.setActiveChatInit(undefined);
    // context.setActiveChatInitMessages(undefined);
    // context.setActiveChatInit(undefined);
    // context.setChatInit([]);
    // context.setLoading(true);
    // context.setNewPersonAddBtn(false);

    // context.setActivePrivateChatOtherUserData("");

    Navigate("/");
  };
  const ShowSettingHandler = () => {
    context.setsideBarOptions((snap) => !snap);
    context.setDisplayUserSettings(true);
  };
  // const changeTheme = () => {
  //   context.setsideBarOptions((snap) => !snap);
  //   toggleColorMode();
  // };
  return (
    <HStack
      justifyContent="space-between"
      p="1"
      pos="sticky"
      top="0"
      zIndex="400"
      boxShadow="sm"
      bgColor={colorMode === "light" ? "brand.chatHeader" : "brand.chatHeader"}
      // bgColor={"brand.secondary"}
      // transition="background-color 2000ms easer"
      // transitionDuration="2000ms"
    >
      <HStack>
        <Image
          alt="User profile"
          src={
            context?.Current_UserData?.ProfilePicture
              ? context?.Current_UserData?.ProfilePicture
              : Placeholder
          }
          boxSize={DEVICE === "Mobile" ? "55" : "75"}
          borderRadius="100"
          userSelect="none"
        />

        <Heading size="lg" userSelect="none">
          {props.title}
        </Heading>
      </HStack>
      <Stack onClick={showDropDown} pos="relative">
        <DotIcon />

        <Stack
          display={context.sideBarOptions ? "block" : "none"}
          pos="absolute"
          right="8"
          top="4"
        >
          <List id="dropdownmenu" width="full">
            <ListItem onClick={ShowSettingHandler}>
              <Button
                w={"full"}
                borderRadius="0"
                border={colorMode === "dark" && "1px solid black"}
              >
                Edit Profile
              </Button>
            </ListItem>
            <ListItem onClick={SignOut}>
              <Button
                w="full"
                borderRadius="0"
                border={colorMode === "dark" && "1px solid black"}
              >
                Logout
              </Button>
            </ListItem>
            {/* <ListItem>
              <Button
                onClick={changeTheme}
                w="full"
                borderRadius="0"
                border={colorMode === "dark" && "1px solid black"}
                padding={DEVICE === "Mobile" ? "8" : "5"}
              >
                {colorMode === "dark" ? (
                  <BsFillSunFill size={50} />
                ) : (
                  <BsFillMoonFill size="40" />
                )}
              </Button>
            </ListItem> */}
          </List>
        </Stack>
      </Stack>
    </HStack>
  );
};
