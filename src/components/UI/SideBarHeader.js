import { useContext } from "react";
import { signOut, getAuth } from "firebase/auth";
import AppContext from "../GlobalStore/Context";
import { useNavigate } from "react-router-dom";
import usePictures from "../Custom_hooks/usePictures";

import {
  HStack,
  Heading,
  Image,
  Stack,
  List,
  ListItem,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";

import useDevice from "../Custom_hooks/useDevice";

import DotIcon from "./DotIcon";

export default function SideBarHeader(props) {
  // init
  const [Placeholder] = usePictures();
  const { colorMode, toggleColorMode } = useColorMode();
  const Navigate = useNavigate();
  const context = useContext(AppContext);
  const auth = getAuth();
  const DEVICE = useDevice();

  const showDropDown = () => {
    context.setsideBarOptions((snap) => !snap);
  };

  const SignOut = () => {
    signOut(auth);
    context.setCurrent_UserID(null);
    context.setCurrent_UserData(undefined);
    // context.setUsersData(undefined);
    context.setActiveChatInit(undefined);
    context.setActiveChatInitMessages(undefined);
    context.setActiveChatInit(undefined);
    context.setChatInit([]);
    context.setLoading(true);
    context.setNewPersonAddBtn(false);

    context.setActivePrivateChatOtherUserData("");

    Navigate("/");
  };
  const ShowSettingHandler = () => {
    context.setsideBarOptions((snap) => !snap);
    context.setDisplayUserSettings(true);
  };
  const changeTheme = () => {
    context.setsideBarOptions((snap) => !snap);
    toggleColorMode();
  };
  return (
    <HStack
      justifyContent="space-between"
      p="1"
      pos="sticky"
      top="0"
      zIndex="400"
      boxShadow="sm"
      bgColor={colorMode === "light" ? "facebook.200" : "facebook.900"}
      transition="background-color 2000ms easer"
      transitionDuration="2000ms"
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
            <ListItem>
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
            </ListItem>
          </List>
        </Stack>
      </Stack>
    </HStack>
  );
}
