import classNames from "classnames";
import iconStyle from "./IconAside.module.css";
import styles from "../OpenAside/OpenAside.module.css";
import { useAside } from "../../../context/index";
import { NavLink } from "react-router-dom";
import {
  HistoryRoundedIcon,
  ThumbUpOutlinedIcon,
  VideoLibraryOutlinedIcon,
  HomeOutlinedIcon,
  WatchLaterOutlinedIcon,
} from "../../../utils/materialUiIcons";

export const IconAside = () => {
  const { aside } = useAside();
  let enableStyle = {
    color: "var(--primary-color)",
    boxShadow: "inset -10px 0px 3px -5px",
  };
  const disabledStyle = {
    color: "black",
  };

  return (
    <div
      className={classNames(
        iconStyle.aside_container,
        aside[1] ? iconStyle.open_asides : ""
      )}
    >
      <NavLink
        to="/"
        style={({ isActive }) => (isActive ? enableStyle : disabledStyle)}
        className={styles.aside_list_container}
      >
        <HomeOutlinedIcon className={styles.aside_list} sx={{ fontSize: 32 }} />
      </NavLink>
      <NavLink
        to="/playlist"
        style={({ isActive }) => (isActive ? enableStyle : disabledStyle)}
        className={styles.aside_list_container}
      >
        <VideoLibraryOutlinedIcon sx={{ fontSize: 32 }} />
      </NavLink>

      <NavLink
        to="/like"
        style={({ isActive }) => (isActive ? enableStyle : disabledStyle)}
        className={styles.aside_list_container}
      >
        <ThumbUpOutlinedIcon sx={{ fontSize: 32 }} />
      </NavLink>

      <NavLink
        to="/watchLater"
        style={({ isActive }) => (isActive ? enableStyle : disabledStyle)}
        className={styles.aside_list_container}
      >
        <WatchLaterOutlinedIcon sx={{ fontSize: 32 }} />
      </NavLink>

      <NavLink
        to="/history"
        style={({ isActive }) => (isActive ? enableStyle : disabledStyle)}
        className={styles.aside_list_container}
      >
        <HistoryRoundedIcon sx={{ fontSize: 32 }} />
      </NavLink>
    </div>
  );
};
