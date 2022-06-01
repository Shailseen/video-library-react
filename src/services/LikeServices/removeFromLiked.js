import axios from "axios";
import { toast } from "react-toastify";
import { REMOVE_LIKE_API } from "../../utils/utils";

export const removeFromLiked = async (_id, setLikeVideos) => {
  try {
    const encodedToken = localStorage.getItem("userToken");
    const response = await axios.delete(REMOVE_LIKE_API + `/${_id}`, {
      headers: {
        authorization: encodedToken,
      },
    });
    toast("Video removed from like successfully!");
    setLikeVideos(response.data.likes);
  } catch (error) {
    toast("Video could not dislike!");
  }
};
