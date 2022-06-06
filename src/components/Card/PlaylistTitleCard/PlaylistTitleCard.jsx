import React from "react";
import { useVideo } from "../../../context/videos-context";
import styles from "./PlaylistTitleCard.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
const PlaylistTitleCard = ({ video }) => {
  const { _id, title, videos } = video;
  return (
    <div key={_id} className={styles.container}>
      <div className={styles.title}>
        <h2>{title}</h2>
        <p className={styles.video_count}>{videos.length} videos</p>
      </div>
      <div className={styles.delete_playlist}>
        <DeleteIcon sx={{ fontSize: "30px" }} />
      </div>
    </div>
  );
};

export default PlaylistTitleCard;
