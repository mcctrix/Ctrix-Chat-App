import { createContext, useState } from "react";

const AppContext = createContext();

export const ContextWrapper = (props) => {
  // Current User Data
  const [Current_UserID, setCurrent_UserID] = useState(null);
  const [Current_UserName, setCurrent_UserName] = useState(null);
  const [Current_UserData, setCurrent_UserData] = useState();

  // Chats Related to Current User
  const [userChats, setuserChats] = useState(false);

  // All User Data
  const [allUsersData, setallUserData] = useState();

  // For Mobile open Chat or Panel
  const [openChat, setopenChat] = useState(false);

  // Current Active Chat
  const [activeChat, setactiveChat] = useState("");

  // Current Acive chat 2nd username
  const [userNameActiveChat, setuserNameActiveChat] = useState();

  // Add button clicked in side bar
  const [newPersonAddBtn, setnewPersonAddBtn] = useState(false);

  // Group Chat User List
  const [groupChatList, setgroupChatList] = useState([]);

  // Sidebar Header Options display
  const [sideBarOptions, setsideBarOptions] = useState(false);

  // User Data Except Current User
  const [UsersData, setUsersData] = useState();

  // Private Chat Inits
  const [chatInit, setChatInit] = useState([]);

  //  Display User Settings

  const [DisplayUserSettings, setDisplayUserSettings] = useState(false);

  // App Loading
  const [Loading, setLoading] = useState(true);

  // Active Chat Data
  const [activeChatData, setactiveChatData] = useState();

  // Giff Div Show
  const [showGifDiv, setshowGifDiv] = useState(false);

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

        sideBarOptions,
        setsideBarOptions,

        newPersonAddBtn,
        setnewPersonAddBtn,

        chatInit,
        setChatInit,

        groupChatList,
        setgroupChatList,

        DisplayUserSettings,
        setDisplayUserSettings,

        Loading,
        setLoading,

        activeChatData,
        setactiveChatData,

        showGifDiv,
        setshowGifDiv,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
