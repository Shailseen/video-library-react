import axios from 'axios'
import React from 'react'
import { toast } from 'react-toastify';
import { ADD_TO_WATCH_LATER_API } from '../../utils/utils'

export const addToWatchLater = async (data,setWatchLaterVideos) => {
    const encodedToken = localStorage.getItem("userToken");
    try {
        const response = await axios.post(ADD_TO_WATCH_LATER_API,
            {
                video: data,
            },
            {
                headers: {
                    authorization: encodedToken,
                }
            })
            toast("Video add to watch later successfully.");
            setWatchLaterVideos(response.data.watchlater);
    } catch (error) {
        if(error.response.status===409)
        toast("The video is already in your watch later videos.");
        else
        toast("Could not add to watch later!");
    }
}
