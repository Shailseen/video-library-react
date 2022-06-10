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
  SignUp
} from "./routes/index";
import {
  ToolTipsProvider,
  AuthProvider,
  AsideProvider,
  VideoProvider,
} from "./context/index";
import { RequireAuth } from "./components/RequireAuth/RequireAuth";


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
                  <Route
                    path="/"
                    element={
                      <RequireAuth>
                        <HomePage />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="/playlist"
                    element={
                      <RequireAuth>                        
                        <PlayList />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="/like"
                    element={
                      <RequireAuth>                        
                        <LikedVideos />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="/watchLater"
                    element={
                      <RequireAuth>                        
                        <WatchLater />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="/history"
                    element={
                      <RequireAuth>                        
                        <History />
                      </RequireAuth>
                    }
                  />
                  <Route path="/watch/:videoId" element={<VideoPlayer />} />
                  <Route
                    path="/playlistVideos/:playlistId"
                    element={<PlaylistVideos />}
                  />
                  <Route path="login" element={<LoginPage />} />
                  <Route path="signup" element={<SignUp/>}/>
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
