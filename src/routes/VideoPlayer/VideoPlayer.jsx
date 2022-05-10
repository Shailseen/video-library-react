import ReactPlayer from "react-player/lazy";
import classNames from "classnames";
import styles from "./VideoPlayer.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import PlaylistAddRoundedIcon from "@mui/icons-material/PlaylistAddRounded";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
export const VideoPlayer = () => {
  const { videoId } = useParams();
  const [data, setData] = useState("");
  const {
    _id,
    title,
    creator,
    creatorLogo,
    thumbnail,
    views,
    timeStamp,
    isInWatchLater,
    videoYTId,
    isLiked,
    description,
  } = data;
  console.log(creatorLogo);
  useEffect(() => {
    (async function() {
      try {
        const response = await axios.get(`/api/video/${videoId}`);
        setData(response.data.video);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className={classNames(styles.container)}>
      <ReactPlayer
        width="100%"
        playing
        controls
        url={`https://www.youtube.com/watch?v=${videoId}`}
      />
      <p className={classNames(styles.title)}>{title}</p>
      <div className={classNames(styles.channel_logo_container)}>
          {creatorLogo && (
            <img
              className={classNames("avatar", styles.avatar_xx_small)}
              src={creatorLogo.url}
              alt={creatorLogo.altText}
            ></img>
          )}
          <div className={styles.channel_name_container}>
            <p className={styles.channel_name}>{creator}</p>
            <p className={styles.view}>{views}</p>
          </div>
        </div>
      <div className={classNames(styles.description_container)}>
        <div className={styles.tools_container}>
          {isLiked ? (
            <div className={styles.icon_wrapper}>
              <ThumbUpRoundedIcon
                className={styles.cursor_pointer}
                sx={{ fontSize: 25 }}
              />{" "}
              <p>DISLIKE</p>
            </div>
          ) : (
            <div className={styles.icon_wrapper}>
              <ThumbUpOutlinedIcon
                className={styles.cursor_pointer}
                sx={{ fontSize: 25 }}
              />{" "}
              <p>LIKE</p>
            </div>
          )}
          <div className={styles.icon_wrapper}>
            <PlaylistAddRoundedIcon
              className={styles.cursor_pointer}
              sx={{ fontSize: 25 }}
            />{" "}
            <p>SAVE TO PLAYLIST</p>{" "}
          </div>
          {isInWatchLater ? (
            <div className={styles.icon_wrapper}>
              <CheckCircleOutlineIcon
                className={styles.cursor_pointer}
                sx={{ fontSize: 25 }}
              />{" "}
              <p>WATCH LATER</p>{" "}
            </div>
          ) : (
            <div className={styles.icon_wrapper}>
              <WatchLaterOutlinedIcon
                className={styles.cursor_pointer}
                sx={{ fontSize: 25 }}
              />{" "}
              <p>WATCH LATER</p>{" "}
            </div>
          )}
        </div>
      </div>
      <p className={styles.description}>{description}</p>
    </div>
  );
};