import { createContext, useState } from "react";

const AppContext = createContext();

export const ContextWrapper = ({ children }) => {
  // Current User Data
  const [Current_UserID, setCurrent_UserID] = useState(null);

  const [Current_UserData, setCurrent_UserData] = useState();

  // All User Data
  const [allUsersData, setallUserData] = useState();

  // User Data Except Current User
  const [UsersData, setUsersData] = useState();

  // Chat Inits related to Current User
  const [chatInit, setChatInit] = useState([]);

  //
  // Active Chat Related Data
  //

  // Current Active Chat
  const [activeChatInit, setActiveChatInit] = useState();

  // Current Acive chat 2nd User Data
  const [activePrivateChatOtherUserData, setActivePrivateChatOtherUserData] =
    useState();

  // Active Chat Data
  const [activeChatInitMessages, setActiveChatInitMessages] = useState();

  // Group Chat User List used for making new Group Chat
  const [newGroupChatUserList, setNewGroupChatUserList] = useState([]);

  //
  // Active Chat Related Data ^^^^
  //
  //
  //

  //
  //
  //
  // Some kind of Toggler for mounting Certain component
  //

  // First time Sign In Indicator
  const [firstTimeLogin, setFirstTimeLogin] = useState(false);

  // For Mobile open Chat or Panel
  const [openChat, setopenChat] = useState(false);

  // Add button clicked in side bar
  const [newPersonAddBtn, setNewPersonAddBtn] = useState(false);

  // Sidebar Header Options display
  const [sideBarOptions, setsideBarOptions] = useState(false);

  //  Display User Settings
  const [DisplayUserSettings, setDisplayUserSettings] = useState(false);

  // App Loading
  const [Loading, setLoading] = useState(true);

  // Giff Div Show
  const [showGifDiv, setshowGifDiv] = useState(false);

  //
  // Some kind of Toggler for mounting Certain component ^^^^^^
  //

  return (
    <AppContext.Provider
      value={{
        Current_UserID,
        setCurrent_UserID,

        Current_UserData,
        setCurrent_UserData,

        activeChatInit,
        setActiveChatInit,

        activePrivateChatOtherUserData,
        setActivePrivateChatOtherUserData,

        UsersData,
        setUsersData,

        allUsersData,
        setallUserData,

        activeChatInitMessages,
        setActiveChatInitMessages,

        newGroupChatUserList,
        setNewGroupChatUserList,

        chatInit,
        setChatInit,

        openChat,
        setopenChat,

        sideBarOptions,
        setsideBarOptions,

        newPersonAddBtn,
        setNewPersonAddBtn,

        DisplayUserSettings,
        setDisplayUserSettings,

        Loading,
        setLoading,

        showGifDiv,
        setshowGifDiv,

        firstTimeLogin,
        setFirstTimeLogin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
