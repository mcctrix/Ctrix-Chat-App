import { Container, CircularProgress, Heading } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Container
      justifyContent="center"
      h="100vh"
      maxW="full"
      pos="fixed"
      zIndex="600"
      bgColor="white"
      centerContent
    >
      <CircularProgress isIndeterminate size="20" />
      <Heading size="lg">Loading Messages</Heading>
    </Container>
  );
};

export default Loading;
