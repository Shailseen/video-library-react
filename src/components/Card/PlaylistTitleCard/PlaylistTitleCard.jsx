import React from "react";
import { useVideo } from "../../../context/videos-context";
import styles from "./PlaylistTitleCard.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import deletePlaylistService from "../../../services/PlaylistServices/deletePlaylistService";
const PlaylistTitleCard = ({ video }) => {
  const { setPlaylistCategories } = useVideo();
  const { _id, title, videos } = video;
  const deletePlaylistHandler = () => {
    deletePlaylistService(_id, setPlaylistCategories);
  };
  return (
    <div key={_id} className={styles.container}>
      <div className={styles.title}>
        <h2>{title}</h2>
        <p className={styles.video_count}>{videos.length} videos</p>
      </div>
      <div className={styles.delete_playlist} onClick={deletePlaylistHandler}>
        <DeleteIcon sx={{ fontSize: "30px" }} />
      </div>
    </div>
  );
};

export default PlaylistTitleCard;
