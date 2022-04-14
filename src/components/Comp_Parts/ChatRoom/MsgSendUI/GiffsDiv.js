import { SearchContextManager } from "@giphy/react-components";
import GiffComponent from "./GiffComponent";

export default function GiffsDiv({ MsgSendHandler }) {
  return (
    <div>
      <SearchContextManager apiKey={process.env.REACT_APP_GIPHY_API_KEY}>
        <GiffComponent MsgSendHandler={MsgSendHandler} />
      </SearchContextManager>
    </div>
  );
}
