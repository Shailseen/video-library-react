import axios from "axios";
import React from "react";

const createPlaylistService = async (title, description,setPlaylistCategories) => {
  try {
    const encodedToken = localStorage.getItem("userToken");
    const res = await axios.post(
      "/api/user/playlists",
      {
        playlist: {
          title: title,
          description: description,
        },
      },
      {
        headers: {
          authorization: encodedToken,
        },
      }
    );
    setPlaylistCategories(prev => res.data.playlists)
  } catch (error) {
    console.log(error);
  }
};

export default createPlaylistService;
