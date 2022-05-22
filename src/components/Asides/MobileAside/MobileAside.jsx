import styles from "./MobileAside.module.css";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import { NavLink } from "react-router-dom";
export const MobileAside = () => {
  let enableStyle = {
    color: "var(--primary-color)",
    textDecoration: "none"
  };
  const disabledStyle = {
      color: "black",
      textDecoration: "none"
  }
  return (
    <div className={styles.aside_container}>
      <NavLink to="/like"
        style={({ isActive }) => (isActive ? enableStyle : disabledStyle)} className={styles.aside_list_container}>
        <ThumbUpOutlinedIcon sx={{ fontSize: 32 }} />
        <span>Like</span>
      </NavLink>
      <NavLink to="/playlist"
        style={({ isActive }) => (isActive ? enableStyle : disabledStyle)} className={styles.aside_list_container}>
        <VideoLibraryOutlinedIcon sx={{ fontSize: 32 }} />
        <span>Library</span>
      </NavLink>
      <NavLink to="/"
        style={({ isActive }) => (isActive ? enableStyle : disabledStyle)} className={styles.aside_list_container}>
        <HomeOutlinedIcon sx={{ fontSize: 32 }} />
        <span>Home</span>
      </NavLink>
      <NavLink to="/history"
        style={({ isActive }) => (isActive ? enableStyle : disabledStyle)} className={styles.aside_list_container}>
        <HistoryRoundedIcon sx={{ fontSize: 32 }} />
        <span>History</span>
      </NavLink>
      <NavLink to="/watchLater"
        style={({ isActive }) => (isActive ? enableStyle : disabledStyle)} className={styles.aside_list_container}>
        <WatchLaterOutlinedIcon sx={{ fontSize: 32 }} />
        <span>Watch </span>
      </NavLink>
    </div>
  );
};
