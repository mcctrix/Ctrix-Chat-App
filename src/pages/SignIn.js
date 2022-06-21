import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../components/firebase/firebase";
import LoginInIcon from "../components/UI/LogInIcon";
import { useState, useEffect } from "react";
import {
  FormLabel,
  Input,
  VStack,
  HStack,
  Heading,
  Button,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import FormContainer from "../components/ChakraComponents/FormContainer";

export default function Signin() {
  const Navigate = useNavigate();
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        Navigate("/main");
      }
    });
    // eslint-disable-next-line
  }, [auth]);
  const NavToSignUp = () => {
    Navigate("/signup");
  };
  const SignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((cred) => {
        console.log("Log in successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const SignInWithEmailPassword = () => {
    // e.preventDefault();
    signInWithEmailAndPassword(auth, userName, password)
      .then(() => {
        console.log("Sign in Successfully");
      })
      .catch((err) => {
        console.error("Something went wrong", err);
      });
  };
  return (
    <FormContainer FormSubmit={SignInWithEmailPassword}>
      <VStack alignItems={"center"}>
        <LoginInIcon />
      </VStack>
      <VStack spacing={"2"} alignItems="flex-start">
        <Heading alignSelf={"center"} fontSize={"2xl"}>
          Login into your account
        </Heading>

        <FormLabel htmlFor="email">Email address</FormLabel>
        <Input
          id="email"
          type="email"
          value={userName}
          onChange={(e) => setuserName(e.target.value)}
          fontSize={"2xl"}
        />

        <FormLabel htmlFor="email">Password</FormLabel>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          fontSize={"2xl"}
        />

        <VStack w={"full"}>
          <HStack w={"full"}>
            <Button onClick={SignInWithEmailPassword} w={"full"}>
              Log In
            </Button>
            <Button onClick={NavToSignUp} w={"full"}>
              Sign Up
            </Button>
          </HStack>
          <Button onClick={SignInWithGoogle} w={"full"}>
            Sign in with Google
          </Button>
        </VStack>
      </VStack>
    </FormContainer>
  );
}
