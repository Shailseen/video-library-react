import React from "react";
import styles from "./HorizontalCard.module.css";
import { removeFromLiked } from "../../../services/LikeServices/removeFromLiked";
import { useVideo } from "../../../context/videos-context";
import { useNavigate } from "react-router-dom";
import { removeFromHistory } from "../../../services/HistoryServices/removeFromHistory";
import { removeFromWatchLater } from "../../../services/WatchLaterServices/removeFromWatchLater";
import deleteVideoFromPlaylistService from "../../../services/PlaylistServices/deleteVideoFromPlaylistService";

import UseAnimations from 'react-useanimations';
import trash from 'react-useanimations/lib/trash'

export default function HorizontalCard({ cardData, type, playlistId }) {
  const {
    setLikeVideos,
    setHistoryVideos,
    setWatchLaterVideos,
    playlistCategories,
    setPlaylistCategories,
  } = useVideo();
  const { _id, title, creator, thumbnail, videoYTId } = cardData;
  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate(`/watch/${videoYTId}`);
  };

  const removeHandler = (event) => {
    event.stopPropagation();
    if (type === "like") removeFromLiked(_id, setLikeVideos);
    else if (type === "history") removeFromHistory(_id, setHistoryVideos);
    else if (type === "watchLater")
      removeFromWatchLater(_id, setWatchLaterVideos);
    else if (type === "playlist")
      deleteVideoFromPlaylistService(
        playlistId,
        _id,
        playlistCategories,
        setPlaylistCategories
      );
  };

  return (
    <div onClick={navigateHandler} className={styles.container}>
      <img src={thumbnail.url} alt={thumbnail.altText} />
      <div className={styles.textContainer}>
        <p>{title}</p>
        <p>{creator}</p>
      </div>
      <div
        onClick={(event) => removeHandler(event)}
        className={styles.deleteIcon}
      >
        <UseAnimations animation={trash} size={40}/>

      </div>
    </div>
  );
}
