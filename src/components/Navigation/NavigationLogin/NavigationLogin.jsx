import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import styles from "../Navigation.module.css";

export const NavigationLogin = ({message}) => {
  const navigate = useNavigate();
  const loginNavigateHandler = () => {
    navigate("/login");
  };
  return (
    <div className={styles.container}>
      <div className={styles.flex_container}>
        {" "}
        <div className={styles.text}>
          {" "}
          {message}
        </div>{" "}
        <button
          onClick={loginNavigateHandler}
          className={classNames(
            "button-style-none solid-button",
            styles.auth_btn
          )}
        >
          LOGIN
        </button>{" "}
      </div>
    </div>
  );
};
