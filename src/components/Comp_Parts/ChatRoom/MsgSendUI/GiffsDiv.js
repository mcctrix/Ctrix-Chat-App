import { SearchContextManager } from "@giphy/react-components";
import GiffComponent from "./GiffComponent";

export default function GiffsDiv() {
  return (
    <SearchContextManager apiKey={process.env.REACT_APP_GIPHY_API_KEY}>
      <GiffComponent />
    </SearchContextManager>
  );
}
