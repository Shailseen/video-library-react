import axios from "axios";
import { ADD_TO_HISTORY_API } from "../../utils/utils";

export const addToHistory = async (item, setHistoryVideos) => {
  try {
    const encodedToken = localStorage.getItem("userToken");
    const response = await axios.post(
      ADD_TO_HISTORY_API,
      {
        video: item,
      },
      {
        headers: {
          authorization: encodedToken,
        },
      }
    );
    setHistoryVideos(response.data.history);
  } catch (error) {
    console.log(error);
  }
};
