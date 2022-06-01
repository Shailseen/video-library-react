import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import styles from "../Navigation.module.css";

export const NavigationHome = ({message}) => {
  const navigate = useNavigate();
  const homeHandler = () => {
    navigate("/");
  };
  return (
    <div className={styles.container}>
    <div className={styles.flex_container}>
      <div className={styles.text}>{message}</div>
      <button
        onClick={homeHandler}
        className={classNames(
          "button-style-none solid-button",
          styles.auth_btn
        )}
      >
        Explore
      </button>
    </div>
    </div>
  );
};
