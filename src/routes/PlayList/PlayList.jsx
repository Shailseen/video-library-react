import React from "react";
import PlaylistTitleCard from "../../components/Card/PlaylistTitleCard/PlaylistTitleCard";
import { NavigationHome } from "../../components/Navigation/NavigationHome/NavigationHome";
import { NavigationLogin } from "../../components/Navigation/NavigationLogin/NavigationLogin";
import { useVideo } from "../../context/videos-context";
import styles from "./Playlist.module.css";

export default function PlayList() {
  const { playlistCategories } = useVideo();
  const encodedToken = localStorage.getItem("userToken");

  return (
    <div className={styles.container}>
      {encodedToken === null ? (
        <NavigationLogin
          message={"You need to login for explore playlist videos"}
        />
      ) : playlistCategories.length === 0 ? (
        <NavigationHome
          message={"You have to create playlist for listing playlists."}
        />
      ) : (
        <>
          <h2 className={styles.heading}>{playlistCategories.length} Video</h2>
          {playlistCategories.map((item) => {
            return (
              <PlaylistTitleCard
                key={item._id}
                playlistId={item._id}
                video={item}
              />
            );
          })}
        </>
      )}
    </div>
  );
}

// {playlistCategories.map((item) => {
//   return <PlaylistTitleCard key={item._id} playlistId={item._id} video={item} />;
// })}
