import { useContext } from "react";
import { Grid, SearchBar, SearchContext } from "@giphy/react-components";

import styles from "../../../../styles/GiffComponent.module.css";

export default function GiffComponent() {
  const { fetchGifs, searchKey } = useContext(SearchContext);
  return (
    <div className={styles.main}>
      <SearchBar />
      <Grid column={3} row={400} key={searchKey} fetchGifs={fetchGifs} />
    </div>
  );
}
