import React from "react";
import HorizontalCard from "../../components/Card/HorizontalCard/HorizontalCard";
import { NavigationHome } from "../../components/Navigation/NavigationHome/NavigationHome";
import { NavigationLogin } from "../../components/Navigation/NavigationLogin/NavigationLogin";
import { useVideo } from "../../context/videos-context";
import styles from "./History.module.css";
import { removeAllFromHistory } from "../../services/HistoryServices/removeAllFromHistory";
import UseAnimations from 'react-useanimations';
import trash from 'react-useanimations/lib/trash2'

export default function History() {
  const { historyVideos, setHistoryVideos,setIsApiPending } = useVideo();
  const encodedToken = localStorage.getItem("userToken");
  return (
    <div className={styles.container}>
      {encodedToken === null ? (
        <NavigationLogin message={"You need to login for explore history videos"} />
      ) : historyVideos.length === 0 ? (
        <NavigationHome
          message={"You have to watch videos for listing history."}
        />
      ) : (
        <div>
          <header className={styles.header_container}>
            <h2 className={styles.heading}>{historyVideos.length} video</h2>
            <span onClick={() => removeAllFromHistory(setHistoryVideos,setIsApiPending)}>
            <UseAnimations animation={trash} size={40}/>
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
