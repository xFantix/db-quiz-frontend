import React from "react";
import ReactDOM from "react-dom/client";
import App from "@view/App/App";
import "@styles/normalize.scss";
import "@styles/globall.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
