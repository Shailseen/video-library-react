import axios from 'axios'
import React from 'react'
import { toast } from 'react-toastify';
import { REMOVE_ALL_FROM_HISTORY_API } from '../../utils/utils'

export const removeAllFromHistory = async (setHistoryVideos) => {
  try {
      const encodedToken = localStorage.getItem("userToken");
      const response = await axios.delete(REMOVE_ALL_FROM_HISTORY_API,
        {
            headers: {
                authorization: encodedToken,
            }
        })
        toast("History cleared successfully!");
        setHistoryVideos(response.data.history);
  } catch (error) {
      toast("Could not clear history!");
  }
}
