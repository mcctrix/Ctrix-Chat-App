import { useState, useEffect } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { Gif } from "@giphy/react-components";

import { Container } from "@chakra-ui/react";

import useDevice from "../Custom_hooks/useDevice";

export default function GifComp({ GIF }) {
  const DEVICE = useDevice();
  const [gif, setGif] = useState(null);
  useEffect(() => {
    const giphyF = new GiphyFetch(process.env.REACT_APP_GIPHY_API_KEY);
    const fetchFunction = async () => {
      const { data } = await giphyF.gif(GIF);
      setGif(data);
    };
    fetchFunction();
  }, [GIF]);
  return (
    <Container p="0" width={DEVICE === "Mobile" ? 200 : 300}>
      {gif && <Gif gif={gif} width={DEVICE === "Mobile" ? 200 : 300} />}
    </Container>
  );
}
