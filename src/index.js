import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { AsideProvider } from "./context/aside-context";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <AsideProvider>
      <App />
    </AsideProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
