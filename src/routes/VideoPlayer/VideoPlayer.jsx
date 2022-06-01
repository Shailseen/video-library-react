import ReactPlayer from "react-player/lazy";
import classNames from "classnames";
import styles from "./VideoPlayer.module.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import PlaylistAddRoundedIcon from "@mui/icons-material/PlaylistAddRounded";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useAuth } from "../../context/auth-context";
import { removeFromLiked } from "../../services/LikeServices/removeFromLiked";
import { addToLiked } from "../../services/LikeServices/addToLiked";
import { useVideo } from "../../context/videos-context";
import { toast } from "react-toastify";
import { addToWatchLater } from "../../services/WatchLaterServices/addToWatchLater";
export const VideoPlayer = () => {
  const { videoId } = useParams();
  const { videos, likeVideos, setLikeVideos,setWatchLaterVideos } = useVideo();
  const [data, setData] = useState("");
  const {
    _id,
    title,
    creator,
    creatorLogo,
    views,
    isInWatchLater,
    isLiked,
    description,
  } = data;
  const { isToken } = useAuth();
  const navigate = useNavigate();
  const encodedToken = localStorage.getItem("userToken");

  useEffect(() => {
    (async function() {
      try {
        const response = await axios.get(`/api/video/${videoId}`);
        setData(response.data.video);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [videos]);
  
  const watchLaterHandler = () => {
    if(encodedToken) addToWatchLater(data, setWatchLaterVideos);
    else toast("You have to login first."); 
  }

  const handleLike = () => {
    if (encodedToken !==null) {
      const isLiked = likeVideos.some((item) => item._id === _id);
      if (isLiked) removeFromLiked(_id, setLikeVideos);
      else addToLiked(data, setLikeVideos);
    } else navigate("/login");
  };

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
          {likeVideos.some((item) => item._id === _id) ? (
            <div onClick={handleLike} className={styles.icon_wrapper}>
              <ThumbUpRoundedIcon
                className={styles.cursor_pointer}
                sx={{ fontSize: 25 }}
              />{" "}
            </div>
          ) : (
            <div onClick={handleLike} className={styles.icon_wrapper}>
              <ThumbUpOutlinedIcon
                className={styles.cursor_pointer}
                sx={{ fontSize: 25 }}
              />{" "}
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
            <div className={styles.icon_wrapper} onClick={watchLaterHandler}>
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
