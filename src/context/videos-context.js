import { useContext, useState, useEffect, createContext } from "react";
import axios from "axios";
import { VIDEOS_API } from "../utils/utils";

const VideoContext = createContext();

const useVideo = () => useContext(VideoContext);

const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  const [likeVideos, setLikeVideos] = useState([]);
  const [historyVideos, setHistoryVideos] = useState([]);
  const [watchLaterVideos, setWatchLaterVideos] = useState([]);
  const [playlistVideos, setPlaylistVideos] = useState(null);
  const [playlistCategories, setPlaylistCategories] = useState([]);
  const [isApiPending, setIsApiPending] = useState(false);

  useEffect(async () => {
    try {
      setIsApiPending(true);
      const response = await axios.get(VIDEOS_API);
      setIsApiPending(false);
      setVideos(response.data.videos);
    } catch (error) {
      setIsApiPending(false);
      console.log(error);
    }
  }, []);

  return (
    <VideoContext.Provider
      value={{
        videos,
        setVideos,
        likeVideos,
        setLikeVideos,
        setHistoryVideos,
        historyVideos,
        watchLaterVideos,
        setWatchLaterVideos,
        playlistVideos,
        setPlaylistVideos,
        playlistCategories,
        setPlaylistCategories,
        isApiPending,
        setIsApiPending,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export { useVideo, VideoProvider };
