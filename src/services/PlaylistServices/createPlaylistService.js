import axios from "axios";
import { toast } from "react-toastify";

const createPlaylistService = async (title, description,setPlaylistCategories) => {
  try {
    const encodedToken = localStorage.getItem("userToken");
    const res = await axios.post(
      "/api/user/playlists",
      {
        playlist: {
          title: title,
          description: description,
        },
      },
      {
        headers: {
          authorization: encodedToken,
        },
      }
    );
    toast("Create playlist successfully!");
    setPlaylistCategories(prev => res.data.playlists)
  } catch (error) {
    toast("Create playlist failed!");
  }
};

export default createPlaylistService;
