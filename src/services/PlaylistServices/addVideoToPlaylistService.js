import axios from "axios";
import { toast } from "react-toastify";

const addVideoToPlaylistService = async (
  playlistId,
  video,
  playlistCategories,
  setPlaylistCategories,
  setIsApiPending
) => {
  try {
    setIsApiPending(true);
    const encodedToken = localStorage.getItem("userToken");
    const res = await axios.post(
      `/api/user/playlists/${playlistId}`,
      { video },
      {
        headers: {
          authorization: encodedToken,
        },
      }
    );
    setIsApiPending(false);
    toast("Video added to playlist successfully !");
    let temp = playlistCategories;
    const newTemp = temp.map((item) =>
      item._id === playlistId ? res.data.playlist : item
    );
    setPlaylistCategories((prev) => newTemp);
  } catch (error) {
    setIsApiPending(false);
    toast("Cannot add to playlist , something went wrong!!");
  }
};

export default addVideoToPlaylistService;
