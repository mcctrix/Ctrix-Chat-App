import React from "react";
import { Container, VStack } from "@chakra-ui/react";

const FormContainer = ({ children, FormSubmit }) => {
  return (
    <Container
      bgImage="linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),url('nature.jpg')"
      bgSize={"100% 100%"}
      maxWidth={"full"}
      minHeight={"100vh"}
      bgRepeat={"no-repeat"}
      justifyContent={"center"}
      centerContent
    >
      <VStack
        padding={"6"}
        bgGradient={" #12c2e9, #c471ed, #f64f59"}
        border={"1px"}
        borderRadius={"md"}
        onSubmit={FormSubmit}
        maxW={"lg"}
        bgColor="Background"
        opacity="0.9"
      >
        {children}
      </VStack>
    </Container>
  );
};
export default FormContainer;
