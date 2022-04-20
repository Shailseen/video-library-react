import styles from "./Navbar.module.css";
import classNames from "classnames";
import brandLogo from "../../assets/brandLogo/brandLogo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useAside } from "../../context/aside-context";

export const Navbar = () => {
  const { setAside, aside } = useAside();
  const hamburgerHandler = () => {
    aside[0] ? setAside(() => [false, true]) : setAside(() => [true, false]);
  };
  return (
    <div className={classNames(styles.navbarContainer)}>
      <div className={classNames(styles.header_container_navbar)}>
        <h1 className={classNames(styles.mg_lt, styles.flex)}>
          <FontAwesomeIcon
            onClick={hamburgerHandler}
            className={classNames(styles.hamburger_icon)}
            icon={faBars}
          />
          <img
            className={classNames(styles.brand_logo)}
            src={brandLogo}
            alt="Brand Logo"
          />
          <span className={classNames(styles.brand_text)}>Video</span>
        </h1>
      </div>
    </div>
  );
};
