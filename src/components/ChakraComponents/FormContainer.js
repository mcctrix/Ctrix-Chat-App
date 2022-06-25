import React from "react";
import { Container, VStack, Heading } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { Button } from "@chakra-ui/react";

const FormContainer = ({ children, title, Icon }) => {
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
        maxW={"lg"}
        bgColor="Background"
        opacity="0.9"
      >
        {Icon && (
          <VStack alignItems={"center"}>
            <Icon />
          </VStack>
        )}
        <VStack spacing={"2"} alignItems="flex-start">
          <Heading alignSelf={"center"} fontSize={"2xl"}>
            {title}
          </Heading>
          <VStack w="full"></VStack>

          {children}
        </VStack>
      </VStack>
    </Container>
  );
};
export default FormContainer;
