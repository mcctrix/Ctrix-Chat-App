import { useState, useEffect } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { Gif } from "@giphy/react-components";

export default function GifComp({ GIF }) {
  const [gif, setGif] = useState(null);
  useEffect(() => {
    const giphyF = new GiphyFetch(process.env.REACT_APP_GIPHY_API_KEY);
    const fetchFunction = async () => {
      const { data } = await giphyF.gif(GIF);
      setGif(data);
    };
    fetchFunction();
  }, [GIF]);
  return gif && <Gif gif={gif} width={340} />;
}
