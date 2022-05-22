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
  useEffect(async () => {
    try {
      const response = await axios.get(VIDEOS_API);
      setVideos(response.data.videos);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // const getVideosByCategory = (category) => {
  //   (async () => {
  //     try {
  //       const response = await axios.get(VIDEOS_API);
  //       if(category === "All") {
  //         setVideos(response.data.videos);
  //       }
  //       else {
  //         let temp = response.data.videos.map((obj) => obj.categoryName === category && obj)
  //         setVideos(temp);
  //       }
  //       setVideos(response.data.videos);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })()
  // };

  return (
    <VideoContext.Provider value={{ videos}}>
      {children}
    </VideoContext.Provider>
  );
};

export { useVideo, VideoProvider };
