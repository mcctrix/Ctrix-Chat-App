import { useContext, useState } from "react";
import usePMInit from "./Custom_hooks/usePMInit";

import AddIcon from "./UI/AddIcon";
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

  if (context.newPersonaddbtn) {
    return (
      <div
        onClick={CloseOptionsInSideBarHeader}
        className={`${styles.main} ${
          DEVICE === "Mobile" && styles.mobSidebar
        } ${context.openChat && styles.mobchatopen}`}
      >
        <div>
          <SideBarHeader id="new" title="Add People" />
          <AddChats />
        </div>
        <button
          className={`${classes.bgcolor} ${classes.textcolor} ${styles.makeGroupBtn}`}
          onClick={makeGroupChat}
        >
          Make Group
        </button>
        {nameGroupChat && <GetNameForGroup togglevis={setnameGroupChat} />}
      </div>
    );
  }
  return (
    <div
      className={`${styles.main} ${DEVICE === "Mobile" && styles.mobSidebar} ${
        context.openChat && styles.mobchatopen
      }`}
      onClick={CloseOptionsInSideBarHeader}
    >
      <div>
        <div className={styles.headerdiv}>
          <SideBarHeader title={context.Current_UserName} />
        </div>

        <div className={styles.chatmodals}>
          {context.privateChatInit &&
            context.privateChatInit.map((data) => (
              <ChatModal key={data.ChatID} data={data} />
            ))}
        </div>
      </div>

      <button
        onClick={() => context.setnewPersonaddbtn(true)}
        className={`${styles.addbutton} ${
          context.newPersonaddbtn && styles.disnoneaddbtn
        } `}
      >
        <AddIcon />
      </button>
    </div>
  );
}
