import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useVideo } from "../../context/videos-context";
import getPlaylistVideosService from "../../services/PlaylistServices/getPlaylistVideosService";
import HorizontalCard from "../../components/Card/HorizontalCard/HorizontalCard";
import { NavigationLogin } from "../../components/Navigation/NavigationLogin/NavigationLogin";
import { NavigationHome } from "../../components/Navigation/NavigationHome/NavigationHome";
import styles from "./PlaylistVideos.module.css"

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

// {playlistVideos &&
//   playlistVideos.videos.map((item) => {
//     return (
//       <HorizontalCard
//         key={item._id}
//         playlistId={playlistId}
//         cardData={item}
//         type="playlist"
//       />
//     );
//   })}
