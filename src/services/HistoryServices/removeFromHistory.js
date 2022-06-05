import axios from "axios";
import { toast } from "react-toastify";
import { REMOVE_FROM_HISTORY_API } from "../../utils/utils";

export const removeFromHistory = async (_id, setHistoryVideos) => {
  try {
    const encodedToken = localStorage.getItem("userToken");
    const response = await axios.delete(REMOVE_FROM_HISTORY_API + `/${_id}`, {
      headers: {
        authorization: encodedToken,
      },
    });
    toast("Video removed from History successfully!");
    setHistoryVideos(response.data.history);
  } catch (error) {
    toast("Video could not delete from history!");
  }
};
