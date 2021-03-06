import ReactPlayer from "react-player/lazy";
import classNames from "classnames";
import styles from "./VideoPlayer.module.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useVideo } from "../../context/index";
import { toast } from "react-toastify";
import { Modal, CreatePlaylistCard } from "../../components/index";
import {
  ThumbUpOutlinedIcon,
  ThumbUpRoundedIcon,
  PlaylistAddRoundedIcon,
} from "../../utils/materialUiIcons";
import {
  addToWatchLater,
  addToLiked,
  removeFromLiked,
} from "../../services/index";

export const VideoPlayer = () => {
  const { videoId } = useParams();
  const {
    videos,
    likeVideos,
    setLikeVideos,
    setVideos,
    setVideoWatchedCount,
  } = useVideo();

  const [data, setData] = useState("");
  const {
    _id,
    title,
    creator,
    creatorLogo,
    views,
    isInWatchLater,
    uploadAt,
    isLiked,
    description,
  } = data;

  const navigate = useNavigate();
  const encodedToken = localStorage.getItem("userToken");
  const [isOpen, setIsOpen] = useState(false);

  const playlistModalHandler = () => {
    encodedToken ? setIsOpen(true) : toast("You have to login first!");
  };

  useEffect(() => {
    if (!data) {
      const videoData = videos.find((item) => item._id === videoId);
      setData(videoData);
    }
  }, [videos]);

  useEffect(() => {
    if (data) {
      setVideoWatchedCount(prevCount => prevCount +1);
      (async function() {
        try {
          const response = await axios.post(`/api/count/video`, {
            videosData: data,
            allVideos: videos,
          });
          setVideos((prev) => response.data.updatedVideos);
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [data]);

  useEffect(() => {
    const tempVideosArr = JSON.parse(JSON.stringify(videos));

    setVideos(
      tempVideosArr.map((video) =>
        video._id === _id ? { ...video, views: video.views + 1 } : video
      )
    );
  }, []);

  const handleLike = () => {
    if (encodedToken !== null) {
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
      <p className={styles.views_date}>
        {views + 1} views ??? {uploadAt}
      </p>
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
          <div className={styles.icon_wrapper} onClick={playlistModalHandler}>
            <PlaylistAddRoundedIcon
              className={styles.cursor_pointer}
              sx={{ fontSize: 25 }}
            />{" "}
            <p>SAVE TO PLAYLIST</p>{" "}
          </div>
        </div>
      </div>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <CreatePlaylistCard video={data} />
      </Modal>
      <p className={styles.description}>{description}</p>
    </div>
  );
};
