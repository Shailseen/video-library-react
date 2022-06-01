import React from "react";
import HorizontalCard from "../../components/Card/HorizontalCard/HorizontalCard";
import { NavigationHome } from "../../components/Navigation/NavigationHome/NavigationHome";
import { NavigationLogin } from "../../components/Navigation/NavigationLogin/NavigationLogin";
import { useVideo } from "../../context/videos-context";
import styles from "./History.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeAllFromHistory } from "../../services/HistoryServices/removeAllFromHistory";

export default function History() {
  const { historyVideos, setHistoryVideos } = useVideo();
  const encodedToken = localStorage.getItem("userToken");
  return (
    <div className={styles.container}>
      {encodedToken === null ? (
        <NavigationLogin />
      ) : historyVideos.length === 0 ? (
        <NavigationHome
          message={"You have to watch videos for listing history."}
        />
      ) : (
        <div>
          <header className={styles.header_container}>
            <h2 className={styles.heading}>{historyVideos.length} video</h2>
            <span onClick={() => removeAllFromHistory(setHistoryVideos)}>
              <DeleteIcon sx={{ fontSize: "30px" }} />
            </span>
          </header>
          {historyVideos.map((item) => {
            return (
              <HorizontalCard key={item._id} cardData={item} type={"history"} />
            );
          })}
        </div>
      )}
    </div>
  );
}
