import { useContext, useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { isMobile } from "react-device-detect";
import usePictures from "../../Custom_hooks/usePictures";

import AppContext from "../../GlobalStore/Context";

import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

import { HStack, Image, Heading, Checkbox } from "@chakra-ui/react";

export default function AddChatPerson(props) {
  // Inits
  const context = useContext(AppContext);
  const [Placeholder] = usePictures();

  // Hooks
  const [isChecked, setisChecked] = useState(false);

  useEffect(() => {
    // For group chat
    if (isChecked) {
      context.setgroupChatList((list) => {
        if (list?.length > 0) {
          return [
            ...list,
            {
              ID: props.user.User_ID,
            },
          ];
        }
        return [
          {
            ID: props.user.User_ID,
          },
        ];
      });
    }
    if (!isChecked) {
      if (context.groupChatList.length > 0) {
        context.setgroupChatList((list) =>
          list.filter((val) => {
            if (val.ID === props.user.User_ID) {
              return false;
            }
            return true;
          })
        );
      }
    }
    // eslint-disable-next-line
  }, [isChecked]);

  const ClickEvent = async () => {
    if (props.GroupMode) return;

    const ID = uuid();
    const MsgRef = doc(db, "Private_Chat_init", ID);

    // We filter all the group chat inits
    const SecPersonNames = context.chatInit.filter(
      (data) => data.ChatType === "DM"
    );

    // Check if Chat with other person already exists

    const IfChatExist = SecPersonNames.findIndex(
      (data) =>
        data.User1.ID === props.user.User_ID ||
        data.User2.ID === props.user.User_ID
    );

    if (
      SecPersonNames.some(
        (data) =>
          data.User1.ID === props.user.User_ID ||
          data.User2.ID === props.user.User_ID
      )
    ) {
      const Chat = SecPersonNames[IfChatExist];

      if (isMobile) {
        context.setopenChat(true);
      }

      context.setuserNameActiveChat(props.user.NickName);
      context.setnewPersonAddBtn(false);
      context.setactiveChat(Chat);
      return;
    }

    // Adding new chat
    const DATA = {
      ChatID: ID,
      ChatType: "DM",
      ChatUserID: [props.user.User_ID, context.Current_UserID],
      User1: { ID: props.user.User_ID },
      User2: { ID: context.Current_UserID },
    };
    setDoc(MsgRef, DATA);
    if (isMobile) {
      context.setopenChat(true);
    }
    context.setnewPersonAddBtn(false);
    context.setuserNameActiveChat(props.user.NickName);
    context.setactiveChat(DATA);
  };

  return (
    <HStack onClick={ClickEvent} padding="3" w="full">
      {props.GroupMode && (
        <Checkbox
          checked={isChecked}
          onChange={() => setisChecked((val) => !val)}
          size="lg"
        />
      )}
      <Image
        src={
          props.user.ProfilePicture ? props.user.ProfilePicture : Placeholder
        }
        alt="user profile"
        boxSize="12"
        borderRadius="50%"
      />
      <Heading size="md">{props.user.NickName}</Heading>
    </HStack>
  );
}
