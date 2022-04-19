import classNames from "classnames";
import styles from "./OpenAside.module.css";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import { useAside } from "../../../context/aside-context";

export const OpenAside = () => {
  const { aside } = useAside();
  return (
    <div className={classNames(styles.aside_container, aside[0] ? styles.open_aside : "")}>
      <div className={styles.aside_list_container}>
        <HomeOutlinedIcon sx={{ fontSize: 32 }} />
        <span>Home</span>
      </div>
      <div className={styles.aside_list_container}>
        <VideoLibraryOutlinedIcon sx={{ fontSize: 32 }} />
        <span>Library</span>
      </div>
      <div className={styles.aside_list_container}>
        <ThumbUpOutlinedIcon sx={{ fontSize: 32 }} />
        <span>Like</span>
      </div>
      <div className={styles.aside_list_container}>
        <WatchLaterOutlinedIcon sx={{ fontSize: 32 }} />
        <span>Watch</span>
      </div>
      <div className={styles.aside_list_container}>
        <HistoryRoundedIcon sx={{ fontSize: 32 }} />
        <span>History</span>
      </div>
    </div>
  );
};
