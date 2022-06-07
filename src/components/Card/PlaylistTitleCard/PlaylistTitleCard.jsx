import React from "react";
import { useVideo } from "../../../context/videos-context";
import { useNavigate } from "react-router-dom";
import styles from "./PlaylistTitleCard.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import deletePlaylistService from "../../../services/PlaylistServices/deletePlaylistService";
const PlaylistTitleCard = ({ video, playlistId }) => {
  const { setPlaylistCategories } = useVideo();
  const { _id, title, videos } = video;
  const navigate = useNavigate();

  const deletePlaylistHandler = (e) => {
    e.stopPropagation();
    deletePlaylistService(_id, setPlaylistCategories);
  };

  const navigateHandler = () => {
    navigate(`/playlistVideos/${playlistId}`);
  };
  
  return (
    // <Link className={styles.link} to={`/playlistVideos/${playlistId}`}>
    <div onClick={navigateHandler} key={_id} className={styles.container}>
      <div className={styles.title}>
        <h2>{title}</h2>
        <p className={styles.video_count}>{videos.length} videos</p>
      </div>
      <div className={styles.delete_playlist} onClick={deletePlaylistHandler}>
        <DeleteIcon sx={{ fontSize: "30px" }} />
      </div>
    </div>
    // </Link>
  );
};

export default PlaylistTitleCard;
