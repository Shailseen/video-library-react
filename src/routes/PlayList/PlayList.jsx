import React from "react";
import PlaylistTitleCard from "../../components/Card/PlaylistTitleCard/PlaylistTitleCard";
import { useVideo } from "../../context/videos-context";
import styles from "./Playlist.module.css";

export default function PlayList() {
  const { playlistCategories } = useVideo();
  return (
    <>
      <h1 className={styles.header}>Playlist</h1>
      <div className={styles.container}>
        {playlistCategories.map((item) => {
          return <PlaylistTitleCard key={item._id} video={item} />;
        })}
      </div>
    </>
  );
}
