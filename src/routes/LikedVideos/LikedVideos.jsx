import classNames from "classnames";
import React from "react";
import { useNavigate } from "react-router-dom";
import HorizontalCard from "../../components/Card/HorizontalCard/HorizontalCard";
import { useAuth } from "../../context/auth-context";
import { useVideo } from "../../context/videos-context";
import styles from "./LikedVideos.module.css";

export default function LikedVideos() {
  const navigate = useNavigate();
  const { likeVideos } = useVideo();
  const encodedToken = localStorage.getItem("userToken");


  const homeHandler = () => {
    navigate("/");
  };
  const loginNavigateHandler = () => {
    navigate("/login");
  }
  return (
    <div className={styles.container}>
      {encodedToken === null ? (
        <div className={styles.flex_container}>
          {" "}
          <div className={styles.text}>
            {" "}
            You need to login for explore liked videos.
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
      ) : likeVideos.length === 0 ? (
        <div className={styles.flex_container}>
          <div className={styles.text}>You have to add videos.</div>
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
      ) : (
        likeVideos.map((item) => {
          return <HorizontalCard key={item._id} cardData={item} />;
        })
      )}
    </div>
  );
}
