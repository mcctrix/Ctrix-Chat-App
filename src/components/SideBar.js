import { useContext, useState } from "react";

import ChatModal from "./UI/ChatModal";
import SideBarHeader from "./UI/SideBarHeader";
import AddChats from "./Comp_Parts/SideBar/AddChats";

import useDevice from "./Custom_hooks/useDevice";

import AppContext from "./GlobalStore/Context";
import GetNameForGroup from "./Functions/GetNameForGroup";

import { Container, HStack, Button } from "@chakra-ui/react";

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
