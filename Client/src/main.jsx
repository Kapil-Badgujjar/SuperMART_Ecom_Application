import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {AppContext} from "./utils/context.jsx";
import './index.scss';

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <AppContext>
      <App />
    </AppContext>
  // </React.StrictMode>
);
