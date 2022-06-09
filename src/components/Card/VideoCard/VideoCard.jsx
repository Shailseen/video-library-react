import styles from "./VideoCard.module.css";
import classNames from "classnames";
import { toast } from "react-toastify";
import {
  MoreVertIcon,
  TimerOutlinedIcon,
  WatchLaterOutlinedIcon,
  PlaylistAddOutlinedIcon,
  RemoveDoneOutlinedIcon,
} from "../../../utils/materialUiIcons";
import { NavLink } from "react-router-dom";
import { useToolTips, useVideo } from "../../../context/index";
import {
  addToWatchLater,
  addToHistory,
  removeFromWatchLater,
} from "../../../services/index";
import { useState } from "react";
import { CreatePlaylistCard, Modal } from "../../index";

export const VideoCard = ({ card, toolTip }) => {
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
  } = card;
  var titles;
  (function reduceTitleLength() {
    titles =
      title.length > 65
        ? title
            .split("")
            .slice(0, 64)
            .concat([".", ".", "."])
            .join("")
        : title;
  })();

  const [isOpen, setIsOpen] = useState(false);
  const { toggleHandler } = useToolTips();
  const { setHistoryVideos, setWatchLaterVideos } = useVideo();

  const encodedToken = localStorage.getItem("userToken");

  const modalHandler = () => {
    if (encodedToken) setIsOpen(true);
    else toast("You need to login first for use playlist!");
  };

  const addToHistoryHandler = () => {
    if (encodedToken) addToHistory(card, setHistoryVideos);
  };

  const watchLaterHandler = () => {
    if (encodedToken) {
      isInWatchLater===false
        ? addToWatchLater(card, setWatchLaterVideos)
        : removeFromWatchLater(card, setWatchLaterVideos);
    } else toast("You have to login first.");
  };

  return (
    <div key={_id} className={classNames(styles.card_container)}>
      <NavLink
        to={`/watch/${videoYTId}`}
        className={classNames(styles.thumbnail_container)}
        onClick={addToHistoryHandler}
      >
        <img
          src={thumbnail && thumbnail.url}
          alt={thumbnail && thumbnail.altText}
          className={classNames(styles.thumbnail)}
        />
        <div className={classNames(styles.timeStamp)}>
          <TimerOutlinedIcon sx={{ fontSize: 18 }} />
          <p>{timeStamp}</p>
        </div>
      </NavLink>
      <div className={styles.profile_detail_container}>
        <div className={styles.profile_container}>
          <img
            className={classNames("avatar", styles.avatar_xx_small)}
            src={creatorLogo && creatorLogo.url}
          ></img>
          <div className={styles.video_description_container}>
            <p>
              <strong>{titles}</strong>
            </p>
            <p>
              <small>{creator}</small>
            </p>
            <div className={classNames(styles.view)}>
              <p>{views}</p>
            </div>
          </div>
        </div>
        <div
          onClick={() => toggleHandler(_id)}
          className={classNames(styles.toolTip_toggle)}
        >
          <MoreVertIcon />
          <div
            className={classNames(
              styles.toolTip_container,
              toolTip && toolTip.isToolTip
                ? styles.show_toolTip_container
                : styles.hide_toolTip_container
            )}
          >
            <div className={classNames(styles.toolTip_list)}>
              {isInWatchLater === false ? (
                <div
                  onClick={watchLaterHandler}
                  className={styles.flex_container}
                >
                  <WatchLaterOutlinedIcon /> <p>Add to Watch Later</p>
                </div>
              ) : (
                <div
                onClick={watchLaterHandler}
                className={styles.flex_container}>
                  {" "}
                  <RemoveDoneOutlinedIcon /> <p>Remove from Watch Later</p>{" "}
                </div>
              )}
            </div>
            <div
              className={classNames(styles.toolTip_list)}
              onClick={modalHandler}
            >
              <PlaylistAddOutlinedIcon />
              <p>Add to Playlist</p>
            </div>
          </div>
        </div>
      </div>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <CreatePlaylistCard video={card} />
      </Modal>
    </div>
  );
};
