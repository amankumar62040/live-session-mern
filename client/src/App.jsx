import React, { useState } from "react";
import axios from "axios";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import StudentView from "./StudentView"; // ✅ Student page

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminView />} />
      <Route path="/session/:unique_id" element={<StudentView />} />
    </Routes>
  );
}

// =======================
// 🎬 ADMIN PAGE COMPONENT
// =======================
function AdminView() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);

  const startSession = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE || "http://localhost:5000"}/api/sessions/start`
      );
      setSession(res.data.session);
    } catch (err) {
      alert("Error starting session: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>🎥 Live Session (Admin)</h1>

      {!session && (
        <button onClick={startSession} className="start-btn" disabled={loading}>
          {loading ? "Starting..." : "START SESSION"}
        </button>
      )}

      {loading && <div className="loading">Initializing session...</div>}

      {session && (
        <div className="session-details">
          <p>
            <strong>Session ID:</strong> {session.unique_id}
          </p>
          <p>
            <strong>Student URL:</strong>{" "}
            <a href={session.userurl} target="_blank" rel="noreferrer">
              {session.userurl}
            </a>
          </p>

          <h3 style={{ marginTop: "1.5rem", color: "#ffcc00" }}>Admin Player</h3>
          <div className="video-wrapper">
            <VideoPlayer
              src={
                import.meta.env.VITE_SAMPLE_VIDEO ||
                "https://www.w3schools.com/html/mov_bbb.mp4"
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}

// =======================
// 🎞️ VIDEO PLAYER COMPONENT
// =======================
function VideoPlayer({ src }) {
  const videoRef = React.useRef();

  const togglePlay = () => {
    const v = videoRef.current;
    if (v.paused) v.play();
    else v.pause();
  };

  const toggleMute = () => {
    const v = videoRef.current;
    v.muted = !v.muted;
  };

  const goFullscreen = () => {
    const v = videoRef.current;
    if (v.requestFullscreen) v.requestFullscreen();
  };

  const changeSpeed = (e) => {
    videoRef.current.playbackRate = Number(e.target.value);
  };

  return (
    <div>
      <video ref={videoRef} src={src} controls />
      <div className="controls">
        <button onClick={togglePlay}>Play / Pause</button>
        <button onClick={toggleMute}>Mute / Unmute</button>
        <button onClick={goFullscreen}>Fullscreen</button>
        <label>
          Speed:
          <select onChange={changeSpeed} defaultValue="1">
            <option value="0.5">0.5x</option>
            <option value="0.75">0.75x</option>
            <option value="1">1x</option>
            <option value="1.25">1.25x</option>
            <option value="1.5">1.5x</option>
            <option value="2">2x</option>
          </select>
        </label>
      </div>
    </div>
  );
}
