import { useContext, useState } from "react";
import usePMInit from "./Custom_hooks/usePMInit";

import ChatModal from "./UI/ChatModal";
import SideBarHeader from "./UI/SideBarHeader";
import AddChats from "./Comp_Parts/SideBar/AddChats";

import useDevice from "./Custom_hooks/useDevice";

import AppContext from "./GlobalStore/Context";
import GetNameForGroup from "./Functions/GetNameForGroup";

import { Container, HStack, Button } from "@chakra-ui/react";

export default function SideBar() {
  // Inits
  usePMInit();
  const DEVICE = useDevice();
  const context = useContext(AppContext);
  // Hooks
  const [nameGroupChat, setnameGroupChat] = useState(false);
  const [makeGroupChatToggler, setMakeGroupBtnToggler] = useState(false);

  // Setting first chat as Active Chat
  if (
    !context.activeChat &&
    context.chatInit.length > 0 &&
    context.UsersData.length > 0
  ) {
    context.setactiveChat(context.chatInit[0]);
    if (context.chatInit[0].ChatType === "Group") {
      context.setuserNameActiveChat(context.chatInit[0].ChatName);
    }
    if (context.chatInit[0].ChatType === "DM") {
      context.setuserNameActiveChat(
        context.Current_UserID === context.chatInit[0].User1.ID
          ? context.UsersData?.find?.(
              (val) => val.User_ID === context.chatInit[0].User2.ID
            ).NickName
          : context.UsersData?.find?.(
              (val) => val.User_ID === context.chatInit[0].User1.ID
            ).NickName
      );
    }
  }

  const CloseOptionsInSideBarHeader = (event) => {
    window.addEventListener("mouseup", () => {
      if (event.target !== "dropdownmenu") {
        context.setsideBarOptions(false);
      }
    });
  };
  const makeGroupChat = () => {
    if (context.groupChatList.length === 0) return;
    setnameGroupChat(true);
  };

  return (
    <Container
      h="100vh"
      w={DEVICE === "Mobile" ? "full" : "25vw"}
      display={context.openChat ? "none" : "flex"}
      p="0"
      flexDirection="column"
      onClick={CloseOptionsInSideBarHeader}
    >
      <Container
        p={"0"}
        overflowX={"auto"}
        css={{ "&::-webkit-scrollbar": { display: "none" } }}
      >
        {context.newPersonAddBtn ? (
          <SideBarHeader id="new" title="Add People" />
        ) : (
          <SideBarHeader title={context.Current_UserName} />
        )}
        <HStack>
          <Button
            onClick={() => {
              context.setnewPersonAddBtn(false);
              setMakeGroupBtnToggler(false);
            }}
            w="full"
            colorScheme={context.newPersonAddBtn ? "blue" : "red"}
            boxShadow="none"
          >
            Chats
          </Button>
          <Button
            onClick={() => context.setnewPersonAddBtn(true)}
            w="full"
            colorScheme={context.newPersonAddBtn ? "red" : "blue"}
            boxShadow="none"
          >
            Contacts
          </Button>
        </HStack>
        {context.newPersonAddBtn ? (
          <AddChats groupBtnToggler={setMakeGroupBtnToggler} />
        ) : (
          <Container p={"0"}>
            {context.chatInit &&
              context.chatInit.map((data) => (
                <ChatModal key={data.ChatID} data={data} />
              ))}
          </Container>
        )}
      </Container>
      {context.newPersonAddBtn && makeGroupChatToggler && (
        <>
          <Button onClick={makeGroupChat}>Make Group</Button>
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
