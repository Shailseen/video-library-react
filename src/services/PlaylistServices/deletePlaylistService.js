import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

const deletePlaylistService = async (playlistId, setPlaylistCategories) => {
  try {
    const encodedToken = localStorage.getItem("userToken");
    const res = await axios.delete(`/api/user/playlists/${playlistId}`, {
      headers: {
        authorization: encodedToken,
      },
    });
    setPlaylistCategories((prev) => res.data.playlists);
    toast("Playlist deleted successfully!");
  } catch (error) {
    toast("Playlist deletion failed!");
  }
};

export default deletePlaylistService;
