import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import "./index.css"; // ✅ Make sure this path is correct (file is inside src)
import "./StudentView.css";


export default function StudentView() {
  const { unique_id } = useParams();
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);

  // ✅ Fetch session details from backend
  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_API_BASE || "http://localhost:5000"
        }/api/sessions/${unique_id}`
      )
      .then((res) => setSession(res.data.session))
      .catch((err) => setError(err.message));
  }, [unique_id]);

  // ✅ Video controls
  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) video.play();
    else video.pause();
  };

  const toggleMute = () => {
    const video = videoRef.current;
    video.muted = !video.muted;
  };

  const goFullscreen = () => {
    const video = videoRef.current;
    if (video.requestFullscreen) video.requestFullscreen();
  };

  const changeSpeed = (e) => {
    const video = videoRef.current;
    video.playbackRate = e.target.value;
  };

  if (error)
    return <h3 style={{ color: "red", textAlign: "center" }}>Error: {error}</h3>;
  if (!session) return <h3 className="loading">Loading session...</h3>;

  return (
    <div className="student-container">
      <h1>🎓 Live Session (Student)</h1>
      <p>
        <strong>Session:</strong> {session.id}
      </p>

      {/* 🎥 Video Section */}
      <div className="video-wrapper">
        <video
          ref={videoRef}
          src={
            import.meta.env.VITE_SAMPLE_VIDEO ||
            "https://www.w3schools.com/html/mov_bbb.mp4"
          }
          controls
        />
      </div>

      {/* 🕹️ Custom Video Controls */}
      <div className="controls">
        <button onClick={togglePlay}>Play / Pause</button>
        <button onClick={toggleMute}>Mute / Unmute</button>
        <button onClick={goFullscreen}>Fullscreen</button>

        <label style={{ color: "#fff" }}>
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
