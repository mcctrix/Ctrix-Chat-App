import { SearchContextManager } from "@giphy/react-components";

//
//
// For Giff Component
//
//

import AppContext from "../../../GlobalStore/Context";
import { useContext } from "react";
import { Grid, SearchBar, SearchContext } from "@giphy/react-components";

import { Container } from "@chakra-ui/react";
import useDevice from "../../../Custom_hooks/useDevice";

export default function GiffsDiv({ MsgSendHandler }) {
  return (
    <SearchContextManager apiKey={process.env.REACT_APP_GIPHY_API_KEY}>
      <Container p="0" pos="relative">
        <GiffComponent MsgSendHandler={MsgSendHandler} />
      </Container>
    </SearchContextManager>
  );
}

const GiffComponent = ({ MsgSendHandler }) => {
  const DEVICE = useDevice();
  const { fetchGifs, searchKey } = useContext(SearchContext);
  const context = useContext(AppContext);

  const GifClick = (gif, e) => {
    e.preventDefault();
    MsgSendHandler({
      type: "Gif",
      GifID: gif.id,
    });
    context.setshowGifDiv(false);
  };

  return (
    <Container
      p="0"
      pos="absolute"
      h="50vh"
      w="500"
      bottom="5vh"
      left={DEVICE === "Desktop" ? "5vw" : "0"}
      zIndex="40"
      overflowY="scroll"
      css={{ "&::-webkit-scrollbar": { display: "none" } }}
      borderWidth="3px"
    >
      <Grid
        key={searchKey}
        fetchGifs={fetchGifs}
        width={500}
        columns={1}
        onGifClick={GifClick}
      />
      <Container p="0" pos="sticky" bottom="0">
        <SearchBar />
      </Container>
    </Container>
  );
};
