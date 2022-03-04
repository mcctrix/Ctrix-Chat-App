import { useState, useContext } from "react";

// import usePMInit from "./Custom_hooks/usePMInit";

import AddIcon from "./UI/AddIcon";
import styles from "../styles/SideBar.module.css";

import ChatModal from "./UI/ChatModal";
import SideBarHeader from "./UI/SideBarHeader";
import AddChats from "./Comp_Parts/AddChats";

import useDevice from "./Custom_hooks/useDevice";

import AppContext from "./GlobalStore/Context";

export default function SideBar() {
  // Inits
  // usePMInit();
  const DEVICE = useDevice();
  const context = useContext(AppContext);

  // Hooks
  const [addBtnClicked, setaddBtnClicked] = useState(false);

  if (!context.activeChat && context.privateChatInit.length > 0) {
    context.setactiveChat(context.privateChatInit[0].ID);
    context.setuserNameActiveChat(
      context.Current_UserName === context.privateChatInit[0].User1
        ? context.privateChatInit[0].User2.Name
        : context.privateChatInit[0].User1.Name
    );
  }

  if (addBtnClicked) {
    return (
      <div className={styles.main}>
        <SideBarHeader
          id="new"
          setaddBtnClicked={setaddBtnClicked}
          title="Add People"
        />
        <AddChats />
      </div>
    );
  }
  return (
    <div
      className={`${styles.main} ${DEVICE === "Mobile" && styles.mobSidebar} ${
        context.openChat && styles.mobchatopen
      }`}
    >
      <SideBarHeader title={context.Current_UserName} />

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
        onClick={() => setaddBtnClicked(true)}
        className={styles.addbutton}
      >
        <AddIcon />
      </button>
    </div>
  );
}
