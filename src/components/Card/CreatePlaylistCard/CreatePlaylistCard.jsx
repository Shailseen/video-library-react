import classNames from "classnames";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useVideo } from "../../../context/videos-context";
import { toast } from "react-toastify";
import styles from "./CreatePlaylistCard.module.css";
import createPlaylistService from "../../../services/PlaylistServices/createPlaylistService";

const CreatePlaylistCard = ({ videoId }) => {
  const { playlistCategories, setPlaylistCategories } = useVideo();
  const [playlistName, setPlaylistName] = useState("");

  const inputHandler = (e) => {
    setPlaylistName((prev) => e.target.value);
  };

  function isPlaylistNameExist(element, index, array) {
    return playlistName === element.title;
  }

  const addPlaylistCategoriesHandler = () => {
    if (!playlistCategories.some(isPlaylistNameExist)) {
      createPlaylistService(playlistName, "", setPlaylistCategories);
    } else {
      toast(`Playlist ${playlistName} already created `);
    }
    setPlaylistName("");
  };

  const playlistVideoHandler = (e) => {
      if(!e.target.checked)
      {
          
      }
  }
  useEffect(() => {
    console.log(playlistCategories);
  }, [playlistCategories]);
  return (
    <div className={styles.container}>
      <div className={styles.input_btn_wrapper}>
        <input
          className={styles.input_playlist_name}
          type="text"
          placeholder="Enter playlist name"
          onChange={inputHandler}
          value={playlistName}
        />
        <button
          className={classNames(
            "button-style-none outline-button",
            styles.btn,
            playlistName.length ? styles.btn_enabled : styles.btn_disabled
          )}
          onClick={() => addPlaylistCategoriesHandler()}
        >
          Create
        </button>
      </div>

      <div className={styles.playlist_lists_container}>
        {playlistCategories.map(({ title, _id, videos}) => {
          return (
            <div key={_id} className={styles.flex}>
              <input type="checkbox" name={title} id={title} checked={videos.includes(videoId)} onChange={playlistVideoHandler} />
              <label htmlFor={title}>{title}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CreatePlaylistCard;
