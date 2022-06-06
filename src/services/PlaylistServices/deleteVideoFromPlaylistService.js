import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

const deleteVideoFromPlaylistService = async (playlistId, videoId,playlistCategories,setPlaylistCategories) => {
  try {
    const encodedToken = localStorage.getItem("userToken");
    const res = await axios.delete(
      `/api/user/playlists/${playlistId}/${videoId}`,
      {
        headers: {
          authorization: encodedToken,
        },
      }
    );
    let temp = playlistCategories;
    const newTemp = temp.map((item) =>
      item._id === playlistId ? res.data.playlist : item
    );
    setPlaylistCategories(prev => newTemp);
    toast("Video delete from playlist successfully.");
    console.log(res);
  } catch (error) {
      toast("Video could not deleted !")
  }
};

export default deleteVideoFromPlaylistService;
