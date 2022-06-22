import { useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import { doc, setDoc } from "firebase/firestore";
import AppContext from "../GlobalStore/Context";
import { db } from "../firebase/firebase";

import {
  Container,
  FormLabel,
  Input,
  Button,
  VStack,
  HStack,
  Heading,
} from "@chakra-ui/react";

export default function GetNameForGroup({ togglevis, toggleGroupMakeBtn }) {
  // Inits
  const context = useContext(AppContext);
  const [groupName, setGroupName] = useState("");

  const SendData = () => {
    if (groupName === "") return;
    if (context.newGroupChatUserList.length === 0) {
      return;
    }
    const ID = uuid();
    const MsgRef = doc(db, "Group_Chat_init", ID);
    let NumOfUsers = [context.Current_UserID];
    let Data = {
      User1: {
        ID: context.Current_UserID,
      },
    };
    for (const user in context.newGroupChatUserList) {
      Data = {
        ...Data,
        ["User" + (parseInt(user) + 2)]: {
          ID: context.newGroupChatUserList[user].ID,
        },
      };
      NumOfUsers.push(context.newGroupChatUserList[user].ID);
    }

    Data = {
      ChatName: groupName,
      ChatID: ID,
      ChatType: "Group",
      ChatUserID: NumOfUsers,
      ...Data,
    };

    setDoc(MsgRef, Data);
    togglevis(false);
    context.setActivePrivateChatOtherUserData(groupName);
    context.setActiveChatInit(Data);
    context.setNewPersonAddBtn(false);
    toggleGroupMakeBtn(false);
  };
  return (
    <Container
      pos="fixed"
      zIndex="500"
      maxW="full"
      h="full"
      justifyContent="center"
      centerContent
    >
      <VStack
        borderRadius="3xl"
        boxShadow="0 0 0 100vmax rgb(0 0 0/ 0.3)"
        padding="8"
      >
        <form onSubmit={SendData}>
          <VStack alignItems="flex-start" gap="2">
            <Heading size="xl">Enter Group Chat Name:</Heading>

            <FormLabel>Enter Group Chat Name: </FormLabel>
            <Input
              min="3"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
            <HStack w={"full"}>
              <Button w={"full"} onClick={SendData}>
                Submit
              </Button>
              <Button w={"full"} onClick={() => togglevis(false)}>
                Cancel
              </Button>
            </HStack>
          </VStack>
        </form>
      </VStack>
    </Container>
  );
}
