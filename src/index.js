import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// Estos dos contenedores son hermanos en el DOM.
const appRoot = document.getElementById("app-root");
// const modalRoot = document.getElementById("modal-root");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  appRoot
);
