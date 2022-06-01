import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./HorizontalCard.module.css";
import { removeFromLiked } from "../../../services/LikeServices/removeFromLiked";
import { useVideo } from "../../../context/videos-context";
import { useNavigate } from "react-router-dom";
import { removeFromHistory } from "../../../services/HistoryServices/removeFromHistory";
export default function HorizontalCard({ cardData, type }) {
  const { setLikeVideos, setHistoryVideos } = useVideo();
  const { _id, title, creator, thumbnail, videoYTId } = cardData;
  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate(`/watch/${videoYTId}`);
  };
  const removeHandler = (event) => {
    event.stopPropagation();
    if (type === "like") removeFromLiked(_id, setLikeVideos);
    else if (type === "history") removeFromHistory(_id, setHistoryVideos);
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
        <DeleteIcon sx={{ fontSize: "35px" }} />
      </div>
    </div>
  );
}
