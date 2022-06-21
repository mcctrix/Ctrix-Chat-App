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

export default function SignUp() {
  // Init
  const auth = getAuth();
  const Navigate = useNavigate();

  // Hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [wrongPasswd, setwrongPasswd] = useState(false);

  const [invalidData, setInvalidData] = useState(false);

  const passwordValidator = () => {
    if (password === confirmPassword) {
      setwrongPasswd(false);
      return;
    }
    setwrongPasswd(true);
  };

  const SignUp = (e) => {
    e?.preventDefault();
    if (password !== confirmPassword) {
      setwrongPasswd(true);
      return;
    }
    setwrongPasswd(false);
    createUserWithEmailAndPassword(auth, email, confirmPassword).catch(() => {
      setInvalidData(true);
    });
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
        <FormControl>
          <FormLabel htmlFor="email">Email address</FormLabel>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fontSize={"2xl"}
          />
          <FormHelperText>We never share your email address</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fontSize={"2xl"}
            onChangeCapture={() => passwordValidator}
          />
          <FormHelperText>Use a Strong Password</FormHelperText>
        </FormControl>
        <FormControl isInvalid={wrongPasswd}>
          <FormLabel htmlFor="CPwd">Confirm Password</FormLabel>
          <Input
            id="CPwd"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fontSize={"2xl"}
            onChangeCapture={() => passwordValidator}
          />

          <FormErrorMessage>Password doesn't match</FormErrorMessage>
        </FormControl>
        {invalidData && <Text>Invalid Email or Password</Text>}
        <VStack width={"full"}>
          <HStack w={"full"}>
            <Button onClick={SignUp} w={"full"}>
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
