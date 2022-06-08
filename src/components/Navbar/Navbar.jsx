import styles from "./Navbar.module.css";
import classNames from "classnames";
import brandLogo from "../../assets/brandLogo/brandLogo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useAside } from "../../context/aside-context";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { useVideo } from "../../context/videos-context";
import UseAnimations from 'react-useanimations';
import menu3 from 'react-useanimations/lib/menu2'

export const Navbar = () => {
  const { setAside, aside } = useAside();
  const {logoutHandler} = useAuth();
  const {setLikeVideos} = useVideo();
  const encodedToken = localStorage.getItem("userToken");

  const hamburgerHandler = () => {
    aside[0] ? setAside(() => [false, true]) : setAside(() => [true, false]);
  };

  return (
    <div className={classNames(styles.navbarContainer)}>
      <div className={classNames(styles.header_container_navbar)}>
        <h1 className={classNames(styles.mg_lt, styles.flex)}>
        <UseAnimations animation={menu3}
        onClick={hamburgerHandler}
        className={classNames(styles.hamburger_icon)}
         size={40}/>
          <img
            className={classNames(styles.brand_logo)}
            src={brandLogo}
            alt="Brand Logo"
          />
          <span className={classNames(styles.brand_text)}>Video</span>
        </h1>
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
        onClick={() => logoutHandler(setLikeVideos)}
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
