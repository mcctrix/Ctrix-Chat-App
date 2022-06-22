import { useState, useRef, useContext } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import usePictures from "../Custom_hooks/usePictures";

import { doc, setDoc } from "firebase/firestore";
import AppContext from "../GlobalStore/Context";
import { db, storage } from "../firebase/firebase";

import {
  Container,
  FormLabel,
  Input,
  Image,
  Radio,
  RadioGroup,
  HStack,
  VStack,
  Button,
  Heading,
  Text,
  useColorMode,
  CircularProgress,
} from "@chakra-ui/react";
import useDevice from "../Custom_hooks/useDevice";

export default function UserSettings(props) {
  // Initialise
  const [, boy, boy2, girl, girl2] = usePictures();
  const { colorMode } = useColorMode();
  const DEVICE = useDevice();

  const context = useContext(AppContext);

  const [image, setimage] = useState("");
  const [UserID, setUserID] = useState("");
  const [SelectedAvatar, setSelectedAvatar] = useState("default");
  const [CustomPicture, setCustomPicture] = useState();

  // Toggler
  const [clickUpload, setclickUpload] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Ref
  const NameRef = useRef(null);
  const UploadRef = useRef(null);

  // Variables
  const ImageSize = DEVICE === "Desktop" ? "16" : "8";

  if (UserID === "") {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setUserID(user.uid);
      }
    });
  }

  const UploadFile = () => {
    // e.preventDefault();
    setclickUpload(true);
    if (!image) return;
    setUploadSuccess(false);
    setclickUpload(false);
    setUploading(true);
    const storageRef = ref(storage, `profilepicture/${image.name}`);
    uploadBytesResumable(storageRef, image)
      .then(() => {
        setUploadSuccess(true);
        setUploading(false);
      })
      .then(() => {
        getDownloadURL(storageRef).then((url) => {
          setCustomPicture(url);
        });
      });
  };
  const CancelSettings = () => {
    context.setDisplayUserSettings(false);
  };

  const SendData = (e) => {
    e.preventDefault();
    if (SelectedAvatar === "other" && !CustomPicture && !uploadSuccess) {
      setclickUpload(true);
      return;
    }
    if (!uploadSuccess && SelectedAvatar === "other") {
      return;
    }
    if (NameRef) {
      setDoc(doc(db, "User_Data", UserID), {
        User_ID: UserID,
        NickName:
          NameRef.current.value === ""
            ? context.Current_UserData.NickName
            : NameRef.current.value,
        ProfilePicture:
          SelectedAvatar === "default"
            ? context.Current_UserData.ProfilePicture
            : SelectedAvatar === "other"
            ? CustomPicture
            : SelectedAvatar,
      });
    }
    context.setCurrent_UserData({
      User_ID: UserID,
      NickName:
        NameRef.current.value === ""
          ? context.Current_UserData.NickName
          : NameRef.current.value,
      ProfilePicture:
        SelectedAvatar === "other" ? CustomPicture : SelectedAvatar,
    });
    context.setDisplayUserSettings(false);
    context.setFirstTimeLogin(false);
  };
  return (
    <Container
      pos="fixed"
      h={"full"}
      w={"full"}
      maxW="full"
      zIndex="500"
      justifyContent="center"
      centerContent
    >
      <VStack
        p="5"
        w={DEVICE === "Mobile" ? "100vw" : "initial"}
        borderRadius="3xl"
        boxShadow="0 0 0 400vmax rgb(0 0 0 / 0.4)"
        bgColor={colorMode === "dark" ? "facebook.900" : "facebook.200"}
      >
        {props.Firsttime && <h1>Welcome to the Ctrix Chats</h1>}

        <form onSubmit={SendData}>
          <VStack spacing="6">
            {props.Firsttime ? (
              <FormLabel>Enter Your nickname: </FormLabel>
            ) : (
              <FormLabel>
                Enter Your nickname, if you want to change it:{" "}
              </FormLabel>
            )}
            <Input min="4" ref={NameRef} required={props.Firsttime} />
            <FormLabel>Choose Avatar for your profile: </FormLabel>
            <RadioGroup
              onChange={setSelectedAvatar}
              // value={SelectAvatar}
              size="lg"
              // defaultValue={boy}
            >
              <Radio value={boy} flexDirection="column">
                <Image src={boy} alt="boy avatar" boxSize={ImageSize} />
              </Radio>
              <Radio value={boy2} flexDirection="column">
                <Image src={boy2} alt="boy2 avatar" boxSize={ImageSize} />
              </Radio>
              <Radio value={girl} flexDirection="column">
                <Image src={girl} alt="girl avatar" boxSize={ImageSize} />
              </Radio>
              <Radio value={girl2} flexDirection="column">
                <Image src={girl2} alt="girl2 avatar" boxSize={ImageSize} />
              </Radio>
              <Radio value="other" flexDirection="column">
                <Text size="lg">Other</Text>
              </Radio>
            </RadioGroup>
            {SelectedAvatar === "other" && (
              <HStack>
                <Input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  ref={UploadRef}
                  onChange={(e) => setimage(e.target.files[0])}
                  required
                ></Input>
                <Button onClick={UploadFile}>Upload</Button>
                {uploadSuccess && (
                  <Heading size="sm">Uploaded Successfully</Heading>
                )}
                {uploading && <CircularProgress isIndeterminate size="10" />}
                {clickUpload && !uploadSuccess && (
                  <Heading size="sm">
                    Click upload to upload your picture.
                  </Heading>
                )}
              </HStack>
            )}

            <HStack>
              <Button type="submit">Submit</Button>
              {!props.Firsttime && (
                <Button onClick={CancelSettings}>Cancel</Button>
              )}
            </HStack>
          </VStack>
        </form>
      </VStack>
    </Container>
  );
}
