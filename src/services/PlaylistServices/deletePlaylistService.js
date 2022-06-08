import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

const deletePlaylistService = async (playlistId, setPlaylistCategories,setIsApiPending) => {
  try {
    setIsApiPending(true);
    const encodedToken = localStorage.getItem("userToken");
    const res = await axios.delete(`/api/user/playlists/${playlistId}`, {
      headers: {
        authorization: encodedToken,
      },
    });
    setIsApiPending(false)
    setPlaylistCategories((prev) => res.data.playlists);
    toast("Playlist deleted successfully!");
  } catch (error) {
    setIsApiPending(false);
    toast("Playlist deletion failed!");
  }
};

export default deletePlaylistService;
