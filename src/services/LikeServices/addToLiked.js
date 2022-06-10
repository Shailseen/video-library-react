import axios from "axios";
import { toast } from "react-toastify";
import { LIKE_API } from "../../utils/utils";

export const addToLiked = (data, setLikeVideos) => {
  (async function() {
    try {
      const encodedToken = localStorage.getItem("userToken");
      const response = await axios.post(
        LIKE_API,
        { video: data },
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      toast.success("Liked Successfully!")
      setLikeVideos((prev) => response.data.likes);
    } catch (error) {
      toast.error("Could not like video!");
    }
  })();
};
