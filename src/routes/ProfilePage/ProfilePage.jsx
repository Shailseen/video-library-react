import classNames from "classnames";
import React from "react";
import { useAuth, useVideo } from "../../context";
import styles from "./ProfilePage.module.css";

export const ProfilePage = () => {
  const { user, logoutHandler } = useAuth();
  const {videoWatchedCount} = useVideo()
  const { email, firstName, lastName } = user ?? {};
  return (
    <div className={styles.container}>
      <div className={styles.description}>
        <p className={styles.first_p}>Name:</p>
        <p className={styles.second_p}>
          {firstName} {lastName}
        </p>
      </div>
      <div className={styles.description}>
        <p className={styles.first_p}>Email: </p>
        <p className={styles.second_p}>{email}</p>
      </div>
      <div className={styles.description}>
        <p className={styles.first_p}>Video watched: </p>
        <p className={styles.second_p}>{videoWatchedCount}</p>
      </div>
      <button
        onClick={() => logoutHandler()}
        className={classNames(
          "button-style-none solid-button",
          styles.auth_btn
        )}
      >
        Logout
      </button>
    </div>
  );
};
