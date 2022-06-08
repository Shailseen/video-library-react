import axios from "axios";
import { toast } from "react-toastify";
import { REMOVE_ALL_FROM_HISTORY_API } from "../../utils/utils";

export const removeAllFromHistory = async (setHistoryVideos,setIsApiPending) => {
  try {
    setIsApiPending(true);
    const encodedToken = localStorage.getItem("userToken");
    const response = await axios.delete(REMOVE_ALL_FROM_HISTORY_API, {
      headers: {
        authorization: encodedToken,
      },
    });
    setIsApiPending(false);
    toast("History cleared successfully!");
    setHistoryVideos(response.data.history);
  } catch (error) {
    toast("Could not clear history!");
  }
};
