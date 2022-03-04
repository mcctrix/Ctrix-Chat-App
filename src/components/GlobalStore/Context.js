import { createContext, useState } from "react";

const AppContext = createContext();

export const ContextWrapper = (props) => {
  // Current User Data
  const [Current_UserID, setCurrent_UserID] = useState("");
  const [Current_UserName, setCurrent_UserName] = useState("");
  const [Current_UserData, setCurrent_UserData] = useState();

  // Chats Related to Current User
  const [userChats, setuserChats] = useState(false);

  // For Mobile open Chat or Panel
  const [openChat, setopenChat] = useState(false);

  // Current Active Chat
  const [activeChat, setactiveChat] = useState("");

  // Current Acive chat 2nd username
  const [userNameActiveChat, setuserNameActiveChat] = useState();

  // All User Data
  const [allUsersData, setallUserData] = useState();

  // User Data Except Current User
  const [UsersData, setUsersData] = useState();

  // Private Chat Inits
  const [privateChatInit, setprivateChatInit] = useState([]);

  return (
    <AppContext.Provider
      value={{
        Current_UserID,
        setCurrent_UserID,

        Current_UserName,
        setCurrent_UserName,

        Current_UserData,
        setCurrent_UserData,

        activeChat,
        setactiveChat,

        userNameActiveChat,
        setuserNameActiveChat,

        userChats,
        setuserChats,

        UsersData,
        setUsersData,

        allUsersData,
        setallUserData,

        openChat,
        setopenChat,

        privateChatInit,
        setprivateChatInit,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
