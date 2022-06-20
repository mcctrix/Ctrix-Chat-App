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
      w="50vw"
      h="50vh"
      bottom="10vh"
      left="5vw"
      zIndex="40"
      overflow="scroll"
    >
      <Grid
        key={searchKey}
        fetchGifs={fetchGifs}
        width={500}
        columns={1}
        onGifClick={GifClick}
      />
      <SearchBar />
    </Container>
  );
};
