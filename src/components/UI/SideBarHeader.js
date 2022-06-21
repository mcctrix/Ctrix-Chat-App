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
    context.setCurrent_UserID("");
    context.setCurrent_UserName("");
    context.setCurrent_UserData("");
    context.setUsersData("");
    context.setactiveChat(null);
    context.setactiveChatData(null);
    context.setChatInit([]);
    context.setChatInit([]);
    context.setLoading(true);
    context.setChatInit([]);
    context.setuserNameActiveChat("");

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
        />

        <Heading size="lg">{props.title}</Heading>
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
              <Button w={"full"} borderRadius="0">
                Edit Profile
              </Button>
            </ListItem>
            <ListItem onClick={SignOut}>
              <Button w="full" borderRadius="0">
                Logout
              </Button>
            </ListItem>
            <ListItem>
              <Button onClick={changeTheme}>Theme mode</Button>
            </ListItem>
          </List>
        </Stack>
      </Stack>
    </HStack>
  );
}
