import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import FormContainer from "../components/ChakraComponents/FormContainer";

import {
  VStack,
  Heading,
  FormLabel,
  Input,
  Button,
  HStack,
  FormControl,
  FormHelperText,
  FormErrorMessage,
  Text,
} from "@chakra-ui/react";

import TextField from "../components/Form/TextField";
import { Formik, Form } from "formik";
import YupValidation, { initialValues } from "../components/Form/YupSignUp";

export default function SignUp() {
  // Init
  const auth = getAuth();
  const Navigate = useNavigate();

  const SignUp = (values, actions) => {
    createUserWithEmailAndPassword(auth, values.email, values.confirmPassword)
      .then(() => {
        actions.isSubmitting(false);
      })
      .catch(() => {
        actions.isSubmitting(false);
      });
  };

  const navToSignIn = () => {
    Navigate("/signin");
  };

  return (
    <FormContainer title="Sign up for an account!">
      <Formik
        initialValues={initialValues}
        validationSchema={YupValidation}
        onSubmit={SignUp}
      >
        {(props) => (
          <Form>
            <TextField
              name="email"
              type="email"
              title="Email"
              YupValidation={YupValidation}
            />
            <TextField
              name="password"
              type="password"
              title="Password"
              YupValidation={YupValidation}
            />
            <TextField
              name="confirmPassword"
              type="password"
              title="Confirm Password"
              YupValidation={YupValidation}
            />

            <VStack w={"full"} marginTop="2">
              <HStack w={"full"}>
                <Button type="submit" isLoading={props.isSubmitting} w={"full"}>
                  Sign Up
                </Button>
                <Button type="reset" w="full" bgColor="red.800">
                  Reset
                </Button>
              </HStack>
            </VStack>
          </Form>
        )}
      </Formik>
      <Button onClick={navToSignIn} w={"full"}>
        Sign In
      </Button>
    </FormContainer>
  );
}
