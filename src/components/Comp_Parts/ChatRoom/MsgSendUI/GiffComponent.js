import { useContext } from "react";
import { Grid, SearchBar, SearchContext } from "@giphy/react-components";
import AppContext from "../../../GlobalStore/Context";

import styles from "../../../../styles/GiffComponent.module.css";

export default function GiffComponent({ MsgSendHandler }) {
  const { fetchGifs, searchKey } = useContext(SearchContext);
  const context = useContext(AppContext);

  // useEffect(() => {
  //   const GifDivCloseEventLogic = (event) => {
  //     if (
  //       // event.target !== "GifDiv" ||
  //       // event.target !== "MsgSendUI" ||
  //       event.target === "MessagesDiv"
  //     ) {
  //       console.log("hi");
  //       context.setshowGifDiv(false);
  //     }
  //   };
  //   window.addEventListener("mouseup", GifDivCloseEventLogic);
  //   return () => {
  //     window.removeEventListener("mouseup", GifDivCloseEventLogic);
  //   };
  // });

  const GifClick = (gif, e) => {
    e.preventDefault();
    MsgSendHandler({
      type: "Gif",
      GifID: gif.id,
    });
    context.setshowGifDiv(false);
  };

  return (
    <div className={styles.main}>
      <Grid
        key={searchKey}
        fetchGifs={fetchGifs}
        width={500}
        columns={1}
        onGifClick={GifClick}
      />
      <div className={styles.SBdiv}>
        <SearchBar />
      </div>
    </div>
  );
}
