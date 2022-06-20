import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import FormContainer from "../components/ChakraComponents/FormContainer";

import {
  VStack,
  Heading,
  FormLabel,
  Input,
  Button,
  HStack,
} from "@chakra-ui/react";

export default function SignUp() {
  // Init
  const auth = getAuth();
  const Navigate = useNavigate();

  // Hooks
  const [wrongPasswd, setwrongPasswd] = useState(false);

  // Ref
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const SignUp = (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setwrongPasswd(true);
      return;
    }
    setwrongPasswd(false);
    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      confirmPasswordRef.current.value
    );
  };

  const navToSignIn = () => {
    Navigate("/signin");
  };

  return (
    <FormContainer>
      {/* <VStack alignItems={"center"}>
        <LoginInIcon />
      </VStack> */}
      <VStack spacing={"2"} alignItems="flex-start">
        <Heading alignSelf={"center"} fontSize={"2xl"}>
          Sign up for new Account
        </Heading>
        <FormLabel htmlFor="email">Email address</FormLabel>
        <Input
          id="email"
          type="email"
          // value={userName}
          // onChange={(e) => setuserName(e.target.value)}
          fontSize={"2xl"}
        />
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          id="password"
          type="password"
          // value={password}
          // onChange={(e) => setpassword(e.target.value)}
          fontSize={"2xl"}
        />
        <FormLabel htmlFor="CPwd">Confirm Password</FormLabel>
        <Input
          id="CPwd"
          type="password"
          // value={password}
          // onChange={(e) => setpassword(e.target.value)}
          fontSize={"2xl"}
        />
        <VStack width={"full"}>
          <HStack w={"full"}>
            <Button
              // onClick={SignInWithEmailPassword}
              w={"full"}
            >
              Sign Up
            </Button>

            <Button onClick={navToSignIn} w={"full"}>
              Sign In
            </Button>
          </HStack>
        </VStack>
      </VStack>
    </FormContainer>
  );
}
