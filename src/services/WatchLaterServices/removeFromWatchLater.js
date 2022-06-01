import axios from "axios";
import { toast } from "react-toastify";
import { REMOVE_FROM_WATCH_LATER_API } from "../../utils/utils";

export const removeFromWatchLater = async (_id, setWatchLaterVideos) => {
  try {
    const encodedToken = localStorage.getItem("userToken");
    const response = await axios.delete(
      REMOVE_FROM_WATCH_LATER_API + `/${_id}`,
      {
        headers: {
          authorization: encodedToken,
        },
      }
    );
    toast("Video remove watch later successfully.");
    setWatchLaterVideos(response.data.watchlater);
  } catch (error) {
    toast("Could not remove video from watch later!");
  }
};
