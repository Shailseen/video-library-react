import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { AsideProvider } from "./context/aside-context";
import { VideoProvider } from "./context/videos-context";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { HomePage } from "./routes/HomePage/HomePage";
import PlayList from "./routes/PlayList/PlayList";
import LikedVideos from "./routes/LikedVideos/LikedVideos";
import WatchLater from "./routes/WatchLater/WatchLater";
import History from "./routes/History/History";
import { VideoPlayer } from "./routes/VideoPlayer/VideoPlayer";
import { ToolTipsProvider } from "./context/toolTip-context";
import { LoginPage } from "./routes/LoginPage/LoginPage";
import { AuthProvider } from "./context/auth-context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PlaylistVideos from "./routes/PlaylistVideos/PlaylistVideos";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastContainer />
      <VideoProvider>
        <AuthProvider>
          <AsideProvider>
            <ToolTipsProvider>
              <Routes>
                <Route path="/" element={<App />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/playlist" element={<PlayList />} />
                  <Route path="/like" element={<LikedVideos />} />
                  <Route path="/watchLater" element={<WatchLater />} />
                  <Route path="/history" element={<History />} />
                  <Route path="/watch/:videoId" element={<VideoPlayer />} />
                  <Route path="login" element={<LoginPage />} />
                  <Route path="/playlistVideos/:playlistId" element={<PlaylistVideos />} />
                </Route>
              </Routes>
            </ToolTipsProvider>
          </AsideProvider>
        </AuthProvider>
      </VideoProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
