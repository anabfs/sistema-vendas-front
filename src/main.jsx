import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx"; // Importa o componente App
import "./index.css"; // se você tiver um global

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
