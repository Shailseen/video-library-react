import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useVideo } from "../../context/index";
import { getPlaylistVideosService } from "../../services/index";
import styles from "./PlaylistVideos.module.css";
import {
  NavigationHome,
  HorizontalCard,
  NavigationLogin,
} from "../../components/index";

const PlaylistVideos = () => {
  const { playlistId } = useParams();
  const { playlistVideos, setPlaylistVideos, playlistCategories } = useVideo();
  const encodedToken = localStorage.getItem("userToken");

  useEffect(() => {
    getPlaylistVideosService(playlistId, setPlaylistVideos);
  }, [playlistCategories]);

  return (
    <div className={styles.container}>
      {encodedToken === null ? (
        <NavigationLogin
          message={"You need to login for explore playlist videos"}
        />
      ) : playlistVideos && playlistVideos.videos.length === 0 ? (
        <NavigationHome
          message={
            "You have to add videos to playlist to listing video playlists."
          }
        />
      ) : (
        <>
          <h2 className={styles.heading}>
            {playlistVideos && playlistVideos.videos.length} Video
          </h2>
          {playlistVideos &&
            playlistVideos.videos.map((item) => {
              return (
                <HorizontalCard
                  key={item._id}
                  playlistId={playlistId}
                  cardData={item}
                  type="playlist"
                />
              );
            })}
        </>
      )}
    </div>
  );
};

export default PlaylistVideos;
