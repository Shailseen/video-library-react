import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { VIDEOS_API } from "../utils/utils";

const VideoContext = createContext();

const useVideo = () => useContext(VideoContext);

const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  const [likeVideos, setLikeVideos] = useState([]);
  const [historyVideos,setHistoryVideos] = useState([]);
  const [watchLaterVideos,setWatchLaterVideos] = useState([]);
  
  useEffect(async () => {
    try {
      const response = await axios.get(VIDEOS_API);
      setVideos(response.data.videos);
    } catch (error) {
      console.log(error);
    }
  }, []);

 
  return (
    <VideoContext.Provider
      value={{ videos, setVideos, likeVideos, setLikeVideos ,setHistoryVideos,historyVideos,watchLaterVideos,setWatchLaterVideos}}
    >
      {children}
    </VideoContext.Provider>
  );
};

export { useVideo, VideoProvider };
