import axios from "axios";
import { toast } from "react-toastify";

const createPlaylistService = async (
  title,
  description,
  setPlaylistCategories,
  setIsApiPending
) => {
  try {
    setIsApiPending(true);
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
    setIsApiPending(false);
    toast("Create playlist successfully!");
    setPlaylistCategories((prev) => res.data.playlists);
  } catch (error) {
    setIsApiPending(false);
    toast("Create playlist failed!");
  }
};

export default createPlaylistService;
