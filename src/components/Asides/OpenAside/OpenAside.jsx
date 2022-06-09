import classNames from "classnames";
import styles from "./OpenAside.module.css";
import {
  HistoryRoundedIcon,
  ThumbUpOutlinedIcon,
  VideoLibraryOutlinedIcon,
  HomeOutlinedIcon,
  WatchLaterOutlinedIcon,
} from "../../../utils/materialUiIcons";
import { useAside } from "../../../context/index";
import { NavLink } from "react-router-dom";

export const OpenAside = () => {
  const { aside } = useAside();
  let enableStyle = {
    color: "var(--primary-color)",
    textDecoration: "none",
    boxShadow: "inset -10px 0px 3px -5px",
  };
  const disabledStyle = {
    color: "black",
    textDecoration: "none",
  };
  return (
    <div
      className={classNames(
        styles.aside_container,
        aside[0] ? styles.open_aside : ""
      )}
    >
      <NavLink
        to="/"
        style={({ isActive }) => (isActive ? enableStyle : disabledStyle)}
        className={styles.aside_list_container}
      >
        <HomeOutlinedIcon sx={{ fontSize: 32 }} />
        <span>Home</span>
      </NavLink>
      <NavLink
        to="/playlist"
        style={({ isActive }) => (isActive ? enableStyle : disabledStyle)}
        className={styles.aside_list_container}
      >
        <VideoLibraryOutlinedIcon sx={{ fontSize: 32 }} />
        <span>Library</span>
      </NavLink>
      <NavLink
        to="/like"
        style={({ isActive }) => (isActive ? enableStyle : disabledStyle)}
        className={styles.aside_list_container}
      >
        <ThumbUpOutlinedIcon sx={{ fontSize: 32 }} />
        <span>Like</span>
      </NavLink>
      <NavLink
        to="/watchLater"
        style={({ isActive }) => (isActive ? enableStyle : disabledStyle)}
        className={styles.aside_list_container}
      >
        <WatchLaterOutlinedIcon sx={{ fontSize: 32 }} />
        <span>Watch</span>
      </NavLink>
      <NavLink
        to="/history"
        style={({ isActive }) => (isActive ? enableStyle : disabledStyle)}
        className={styles.aside_list_container}
      >
        <HistoryRoundedIcon sx={{ fontSize: 32 }} />
        <span>History</span>
      </NavLink>
    </div>
  );
};
