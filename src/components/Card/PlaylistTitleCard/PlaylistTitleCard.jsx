import React from "react";
import { useVideo } from "../../../context/index";
import { useNavigate } from "react-router-dom";
import styles from "./PlaylistTitleCard.module.css";
import { deletePlaylistService } from "../../../services/index";
import UseAnimations from "react-useanimations";
import airplay from "react-useanimations/lib/airplay";
import trash from "react-useanimations/lib/trash";

export const PlaylistTitleCard = ({ video, playlistId }) => {
  const { setPlaylistCategories, setIsApiPending } = useVideo();
  const { _id, title, videos } = video;
  const navigate = useNavigate();

  const deletePlaylistHandler = (e) => {
    e.stopPropagation();
    deletePlaylistService(_id, setPlaylistCategories, setIsApiPending);
  };

  const navigateHandler = () => {
    navigate(`/playlistVideos/${playlistId}`);
  };

  return (
    <div onClick={navigateHandler} key={_id} className={styles.container}>
      <div>
        <UseAnimations animation={airplay} size={40} />
      </div>
      <div className={styles.title}>
        <h2>{title}</h2>
        <p className={styles.video_count}>{videos.length} videos</p>
      </div>
      <div className={styles.delete_playlist} onClick={deletePlaylistHandler}>
        <UseAnimations animation={trash} size={40} />
      </div>
    </div>
  );
};
