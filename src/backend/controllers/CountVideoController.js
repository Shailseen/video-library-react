import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";

export const updateCountToViewedVideos = function(schema, request) {
  try {
    const { videosData, allVideos } = JSON.parse(request.requestBody);
    const video = { ...videosData, views: videosData.views + 1 };
    const updatedVideos = allVideos.map((item) =>
      item._id === video._id ? video : item
    );
    return new Response(200, {}, { updatedVideos });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};
/**
 * This handler handles removing videos from user's history.
 * send DELETE Request at /api/user/history/:videoId
 * */
