import axios from "axios";
import { toast } from "react-toastify";

const deleteVideoFromPlaylistService = async (
  playlistId,
  videoId,
  playlistCategories,
  setPlaylistCategories
  ,setIsApiPending
) => {
  try {
    setIsApiPending(true);
    const encodedToken = localStorage.getItem("userToken");
    const res = await axios.delete(
      `/api/user/playlists/${playlistId}/${videoId}`,
      {
        headers: {
          authorization: encodedToken,
        },
      }
    );
    setIsApiPending(false)
    let temp = playlistCategories;
    const newTemp = temp.map((item) =>
      item._id === playlistId ? res.data.playlist : item
    );
    setPlaylistCategories((prev) => newTemp);
    toast.success("Video delete from playlist successfully.");
  } catch (error) {
    setIsApiPending(false)
    toast.error("Video could not deleted !");
  }
};

export default deleteVideoFromPlaylistService;
