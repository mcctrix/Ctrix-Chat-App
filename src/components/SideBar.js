import { useContext, useState } from "react";
import usePMInit from "./Custom_hooks/usePMInit";

import styles from "../styles/SideBar.module.css";
import classes from "./GlobalStore/GlobalStyles.module.css";

import ChatModal from "./UI/ChatModal";
import SideBarHeader from "./UI/SideBarHeader";
import AddChats from "./Comp_Parts/AddChats";

import useDevice from "./Custom_hooks/useDevice";

import AppContext from "./GlobalStore/Context";
import GetNameForGroup from "./Functions/GetNameForGroup";

export default function SideBar() {
  // Inits
  usePMInit();
  const DEVICE = useDevice();
  const context = useContext(AppContext);
  // Hooks
  const [nameGroupChat, setnameGroupChat] = useState(false);
  const [makeGroupChatToggler, setMakeGroupBtnToggler] = useState(false);

  // Setting first chat as Active Chat
  if (
    !context.activeChat &&
    context.privateChatInit.length > 0 &&
    context.UsersData.length > 0
  ) {
    context.setactiveChat(context.privateChatInit[0]);
    if (context.privateChatInit[0].ChatType === "Group") {
      context.setuserNameActiveChat(context.privateChatInit[0].ChatName);
    }
    if (context.privateChatInit[0].ChatType === "DM") {
      context.setuserNameActiveChat(
        context.Current_UserID === context.privateChatInit[0].User1.ID
          ? context.UsersData?.find?.(
              (val) => val.User_ID === context.privateChatInit[0].User2.ID
            ).NickName
          : context.UsersData?.find?.(
              (val) => val.User_ID === context.privateChatInit[0].User1.ID
            ).NickName
      );
    }
  }

  const CloseOptionsInSideBarHeader = (event) => {
    window.addEventListener("mouseup", () => {
      if (event.target !== "dropdownmenu") {
        context.setsideBarOptions(false);
      }
    });
  };
  const makeGroupChat = () => {
    if (context.groupChatList.length === 0) return;
    setnameGroupChat(true);
  };

  return (
    <div
      className={`${styles.main} ${DEVICE === "Mobile" && styles.mobSidebar} ${
        context.openChat && styles.mobchatopen
      }`}
      onClick={CloseOptionsInSideBarHeader}
    >
      <div className={styles.chatListContainer}>
        <div className={styles.headerdiv}>
          {context.newPersonAddBtn ? (
            <SideBarHeader id="new" title="Add People" />
          ) : (
            <SideBarHeader title={context.Current_UserName} />
          )}
        </div>
        <nav className={styles.navBar}>
          <span
            className={`${!context.newPersonAddBtn && styles.navItemActive} ${
              styles.navItems
            }`}
            onClick={() => context.setnewPersonAddBtn(false)}
          >
            Chats
          </span>
          <span
            className={`${context.newPersonAddBtn && styles.navItemActive} ${
              styles.navItems
            }`}
            onClick={() => context.setnewPersonAddBtn(true)}
          >
            Contacts
          </span>
        </nav>
        {context.newPersonAddBtn ? (
          <AddChats groupBtnToggler={setMakeGroupBtnToggler} />
        ) : (
          <div className={styles.chatmodals}>
            {context.privateChatInit &&
              context.privateChatInit.map((data) => (
                <ChatModal key={data.ChatID} data={data} />
              ))}
          </div>
        )}
      </div>
      {
        context.newPersonAddBtn && makeGroupChatToggler ? (
          <>
            <button
              className={`${classes.bgcolor} ${classes.textcolor} ${styles.makeGroupBtn}`}
              onClick={makeGroupChat}
            >
              Make Group
            </button>
            {nameGroupChat && <GetNameForGroup togglevis={setnameGroupChat} />}
          </>
        ) : null
        // <div className={styles.addBtnDiv}>
        //   <button
        //     onClick={() => context.setnewPersonAddBtn(true)}
        //     className={`${styles.addbutton} ${
        //       context.newPersonAddBtn && styles.displayNoneAddBtn
        //     } `}
        //   >
        //     <AddIcon />
        //   </button>
        // </div>
      }
    </div>
  );
}
