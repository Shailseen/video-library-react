import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./HorizontalCard.module.css";
import { removeFromLiked } from "../../../services/LikeServices/removeFromLiked";
import { useVideo } from "../../../context/videos-context";
import { useNavigate } from "react-router-dom";
export default function HorizontalCard({ cardData }) {
  const { setLikeVideos } = useVideo();
  const {
    _id,
    title,
    creator,
    thumbnail,
    videoYTId
  } = cardData;
  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate(`/watch/${videoYTId}`);
  }
  const removeHandler = (event) => {
    event.stopPropagation();
    removeFromLiked(_id, setLikeVideos);
  }
  return (
    <div onClick={navigateHandler} className={styles.container}>
      <img src={thumbnail.url} alt={thumbnail.altText} />
      <div className={styles.textContainer}>
        <p>{title}</p>
        <p>{creator}</p>
      </div>
      <div
        onClick={(event) =>removeHandler(event)}
        className={styles.deleteIcon}
      >
        <DeleteIcon sx={{ fontSize: "35px" }} />
      </div>
    </div>
  );
}
