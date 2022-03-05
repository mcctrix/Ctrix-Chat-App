import { useContext } from "react";

import usePMInit from "./Custom_hooks/usePMInit";

import AddIcon from "./UI/AddIcon";
import styles from "../styles/SideBar.module.css";

import ChatModal from "./UI/ChatModal";
import SideBarHeader from "./UI/SideBarHeader";
import AddChats from "./Comp_Parts/AddChats";

import useDevice from "./Custom_hooks/useDevice";

import AppContext from "./GlobalStore/Context";

export default function SideBar() {
  // Inits
  usePMInit();
  const DEVICE = useDevice();
  const context = useContext(AppContext);

  if (!context.activeChat && context.privateChatInit.length > 0) {
    context.setactiveChat(context.privateChatInit[0].ID);
    context.setuserNameActiveChat(
      context.Current_UserName === context.privateChatInit[0].User1
        ? context.privateChatInit[0].User2.Name
        : context.privateChatInit[0].User1.Name
    );
  }

  const CloseOptionsInSideBarHeader = (event) => {
    window.addEventListener("mouseup", () => {
      if (event.target !== "dropdownmenu") {
        context.setsideBarOptions(false);
      }
    });
  };

  if (context.newPersonaddbtn) {
    return (
      <div
        onClick={CloseOptionsInSideBarHeader}
        className={`${styles.main} ${
          DEVICE === "Mobile" && styles.mobSidebar
        } ${context.openChat && styles.mobchatopen}`}
      >
        <SideBarHeader id="new" title="Add People" />
        <AddChats />
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
      <div className={styles.headerdiv}>
        <SideBarHeader title={context.Current_UserName} />
      </div>

      <div className={styles.chatroom}>
        {context.privateChatInit ? (
          context.privateChatInit.map((data) => (
            <ChatModal
              key={
                context.Current_UserName === data.User1.Name
                  ? data.User2.ID
                  : data.User1.ID
              }
              data={data}
            />
          ))
        ) : (
          <p>Loading...</p>
        )}
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
