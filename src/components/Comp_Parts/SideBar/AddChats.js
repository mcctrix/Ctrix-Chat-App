import { useContext, useState } from "react";

import AppContext from "../../GlobalStore/Context";

import AddChatPerson from "./AddChatPerson";

import { Container, Button, VStack } from "@chakra-ui/react";

export default function AddChats({ groupBtnToggler }) {
  // Init
  const context = useContext(AppContext);

  // Hooks
  const [groupAddMode, setgroupAddMode] = useState(false);

  const toggleGroupMode = () => {
    groupBtnToggler((val) => !val);
    setgroupAddMode((val) => !val);
  };

  return (
    <Container padding="0">
      <Button onClick={toggleGroupMode} w="full" size="lg">
        Make Group Chat
      </Button>
      <VStack alignItems="flex-start" spacing="0">
        {context.UsersData.map((user) => (
          <AddChatPerson
            user={user}
            key={user.User_ID}
            GroupMode={groupAddMode}
          />
        ))}
      </VStack>
    </Container>
  );
}
