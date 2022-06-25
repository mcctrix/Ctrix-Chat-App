import { Container, Heading, Text } from "@chakra-ui/react";

const InActiveChatComponent = () => {
  return (
    <Container
      maxW="full"
      w="85vw"
      h="100vh"
      m="0"
      p="0"
      // paddingTop="30vh"
      justifyContent="center"
      centerContent
    >
      <Heading size="2xl">Welcome to Ctrix Chats</Heading>
      <Text>Select one of the chats</Text>
    </Container>
  );
};

export default InActiveChatComponent;
