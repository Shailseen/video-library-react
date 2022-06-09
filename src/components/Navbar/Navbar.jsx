import styles from "./Navbar.module.css";
import classNames from "classnames";
import brandLogo from "../../assets/brandLogo/brandLogo.jpg";
import { useAside } from "../../context/aside-context";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { useVideo } from "../../context/videos-context";
import UseAnimations from "react-useanimations";
import menu3 from "react-useanimations/lib/menu2";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useCallback } from "react";
import debounce from "lodash.debounce";
import { useEffect } from "react";
import { style } from "@mui/system";



export const Navbar = () => {
  const { setAside, aside } = useAside();
  const { logoutHandler } = useAuth();
  const { videos, setSearchVideosList, setIsApiPending } = useVideo();
  const encodedToken = localStorage.getItem("userToken");
  const [userQuery, setUserQuery] = useState("");

  let location = useLocation();
  location = location.pathname;
  console.log(location)

  useEffect(() => {
    if (videos) setSearchVideosList(videos);
  }, [videos]);

  const hamburgerHandler = () => {
    aside[0] ? setAside(() => [false, true]) : setAside(() => [true, false]);
  };

  const searchboxHandler = (e) => {
    setUserQuery((prev) => e.target.value);
  };

  const updateQuery = () => {
    sendQuery();
  };

  const delayedQuery = useCallback(debounce(updateQuery, 1000), [userQuery]);

  useEffect(() => {
    setIsApiPending(true);
    delayedQuery();

    return delayedQuery.cancel;
  }, [userQuery, delayedQuery]);

  const sendQuery = () => {
    let duplicateVideoArray = JSON.parse(JSON.stringify(videos));
    let tempSearchList = duplicateVideoArray.filter(
      (item) => item.title.toLowerCase().search(userQuery.toLowerCase()) !== -1
    );
    setSearchVideosList((prev) => tempSearchList);
    setIsApiPending(false);
  };

  return (
    <div className={classNames(styles.navbarContainer)}>
      <div className={classNames(styles.header_container_navbar)}>
        <h1 className={classNames(styles.mg_lt, styles.flex)}>
          <UseAnimations
            animation={menu3}
            onClick={hamburgerHandler}
            className={classNames(styles.hamburger_icon)}
            size={40}
          />
          <img
            className={classNames(styles.brand_logo)}
            src={brandLogo}
            alt="Brand Logo"
          />
          <span className={classNames(styles.brand_text)}>dekho</span>
        </h1>
      </div>
      <div className={classNames(styles.searchbar,location!=="/" && styles.hide_searchbox)}>
        <input
          type="text"
          placeholder="Search video here..."
          onChange={searchboxHandler}
          value={userQuery}
        />
        <SearchIcon
          sx={{ fontSize: "26px",color: "var(--primary-color)" ,margin: "auto"}}
          
        />
      </div>
      {!encodedToken ? (
        <Link to="/login">
          <button
            className={classNames(
              "button-style-none outline-button",
              styles.auth_btn
            )}
          >
            Log In
          </button>
        </Link>
      ) : (
        <button
          onClick={() => logoutHandler()}
          className={classNames(
            "button-style-none outline-button",
            styles.auth_btn
          )}
        >
          Logout
        </button>
      )}
    </div>
  );
};
