import axios from "axios";
import { toast } from "react-toastify";
import { REMOVE_FROM_WATCH_LATER_API } from "../../utils/utils";

export const removeFromWatchLater = async (card, setWatchLaterVideos) => {
  try {
    const encodedToken = localStorage.getItem("userToken");
    const response = await axios.delete(
      REMOVE_FROM_WATCH_LATER_API + `/${card._id}`,
      {
        headers: {
          authorization: encodedToken,
        },
      }
    );
    card.isInWatchLater = false;
    toast.success("Video remove watch later successfully.");
    setWatchLaterVideos(response.data.watchlater);
  } catch (error) {
    toast.error("Could not remove video from watch later!");
  }
};
