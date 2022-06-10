import React from "react";
import {
  HorizontalCard,
  NavigationHome,
  NavigationLogin,
} from "../../components/index";
import { useVideo } from "../../context/index";
import styles from "./History.module.css";
import { DeleteIcon } from "../../utils/materialUiIcons";
import { removeAllFromHistory } from "../../services/index";

export default function History() {
  const { historyVideos, setHistoryVideos, setIsApiPending } = useVideo();
  const encodedToken = localStorage.getItem("userToken");
  return (
    <div className={styles.container}>
      {encodedToken === null ? (
        <NavigationLogin
          message={"You need to login for explore history videos"}
        />
      ) : historyVideos.length === 0 ? (
        <NavigationHome
          message={"You have to watch videos for listing history."}
        />
      ) : (
        <div>
          <header className={styles.header_container}>
            <h2 className={styles.heading}>{historyVideos.length} video</h2>
            <span
              onClick={() =>
                removeAllFromHistory(setHistoryVideos, setIsApiPending)
              }
            >
              <DeleteIcon sx={{fontSize: "35px"}}/>
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
