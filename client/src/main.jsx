import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import SessionPage from "./session/SessionPage"; // ✅ Student Page

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/session/:unique_id" element={<SessionPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
