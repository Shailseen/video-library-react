import React from "react";
import {
  NavigationLogin,
  HorizontalCard,
  NavigationHome,
} from "../../components/index";
import { useVideo } from "../../context/index";
import styles from "./LikedVideos.module.css";

export default function LikedVideos() {
  const { likeVideos } = useVideo();
  const encodedToken = localStorage.getItem("userToken");

  return (
    <div className={styles.container}>
      {encodedToken === null ? (
        <NavigationLogin
          message={"You need to login for explore like videos"}
        />
      ) : likeVideos.length === 0 ? (
        <NavigationHome
          message={"You have to like videos for listing like videos."}
        />
      ) : (
        <>
          <h2 className={styles.heading}>{likeVideos.length} Video</h2>
          {likeVideos.map((item) => {
            return (
              <HorizontalCard key={item._id} cardData={item} type={"like"} />
            );
          })}
        </>
      )}
    </div>
  );
}
