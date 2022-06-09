import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  History,
  HomePage,
  LikedVideos,
  LoginPage,
  PlayList,
  PlaylistVideos,
  VideoPlayer,
  WatchLater,
} from "./routes/index";
import {
  ToolTipsProvider,
  AuthProvider,
  AsideProvider,
  VideoProvider,
} from "./context/index";

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
                  <Route
                    path="/playlistVideos/:playlistId"
                    element={<PlaylistVideos />}
                  />
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
