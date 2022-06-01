import React from "react";
import HorizontalCard from "../../components/Card/HorizontalCard/HorizontalCard";
import { NavigationHome } from "../../components/Navigation/NavigationHome/NavigationHome";
import { NavigationLogin } from "../../components/Navigation/NavigationLogin/NavigationLogin";
import { useVideo } from "../../context/videos-context";
import styles from "./WatchLater.module.css";

export default function WatchLater() {
  const { watchLaterVideos } = useVideo();
  const encodedToken = localStorage.getItem("userToken");
  return (
    <div className={styles.container}>
      {encodedToken === null ? (
        <NavigationLogin
          message={"You need to login for explore watch later videos"}
        />
      ) : watchLaterVideos.length === 0 ? (
        <NavigationHome message={"You have to add videos in watch later."} />
      ) : (
        <div>
          <h2>{watchLaterVideos.length} Watch later video</h2>
          {watchLaterVideos.map((item) => {
            return (
              <HorizontalCard
                key={item._id}
                cardData={item}
                type={"watchLater"}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
