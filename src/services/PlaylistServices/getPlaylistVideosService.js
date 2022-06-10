import axios from "axios";
import { toast } from "react-toastify";

const getPlaylistVideosService = async (playlistId, setPlaylistVideos) => {
  try {
    const encodedToken = localStorage.getItem("userToken");
    const res = await axios.get(`/api/user/playlists/${playlistId}`, {
      headers: {
        authorization: encodedToken,
      },
    });
    setPlaylistVideos(prev => res.data.playlist);
  } catch (error) {
      toast.error("Can't load video !");
  }
};

export default getPlaylistVideosService;
