import styles from "./VideoCard.module.css";
import classNames from "classnames";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import RemoveDoneOutlinedIcon from "@mui/icons-material/RemoveDoneOutlined";
import { NavLink } from "react-router-dom";
import { useToolTips } from "../../../context/toolTip-context";
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
  var titles
  (function reduceTitleLength() {
    titles = title.length > 65 ? title.split('').slice(0,64).concat([".",".","."]).join('') : title
  })()
  const { toggleHandler } = useToolTips();

  return (
    <div key={_id} className={classNames(styles.card_container)}>
      <NavLink
        to={`/watch/${videoYTId}`}
        className={classNames(styles.thumbnail_container)}
      >
        {/* <div> */}
        <img
          src={thumbnail && thumbnail.url}
          alt={thumbnail && thumbnail.altText}
          className={classNames(styles.thumbnail)}
        />
        {/* </div> */}
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
                <>
                  <WatchLaterOutlinedIcon /> <p>Add to Watch Later</p>
                </>
              ) : (
                <>
                  {" "}
                  <RemoveDoneOutlinedIcon /> <p>Remove from Watch Later</p>{" "}
                </>
              )}
            </div>
            <div className={classNames(styles.toolTip_list)}>
              <PlaylistAddOutlinedIcon />
              <p>Add to Playlist</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
