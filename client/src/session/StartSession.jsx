import React, { useState } from 'react'
import axios from 'axios'

export default function StartSession(){
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);

  const start = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE || 'http://localhost:5000'}/api/sessions/start`);
      setSession(res.data.session);
    } catch (err) {
      alert('Error starting session: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button onClick={start} style={{padding:10, fontSize:16}} disabled={loading}>{loading? 'Starting...':'START SESSION'}</button>
      {session && (
        <div style={{marginTop:20}}>
          <p><strong>Session ID:</strong> {session.unique_id}</p>
          <p><strong>Student URL:</strong> <a href={session.userurl} target="_blank" rel="noreferrer">{session.userurl}</a></p>
          <h3>Admin Player</h3>
          <VideoPlayer src={import.meta.env.VITE_SAMPLE_VIDEO||'https://www.w3schools.com/html/mov_bbb.mp4'} />
        </div>
      )}
    </div>
  )
}

function VideoPlayer({src}){
  const videoRef = React.useRef();

  const togglePlay = ()=> {
    const v = videoRef.current;
    if(v.paused) v.play(); else v.pause();
  }
  const goFullscreen = ()=> {
    const v = videoRef.current;
    if(v.requestFullscreen) v.requestFullscreen();
  }
  return (
    <div>
      <video ref={videoRef} src={src} controls style={{width:'100%', maxWidth:800}} />
      <div style={{marginTop:8}}>
        <button onClick={togglePlay}>Play/Pause</button>
        <button onClick={()=> videoRef.current.muted = !videoRef.current.muted}>Mute/Unmute</button>
        <button onClick={goFullscreen}>Fullscreen</button>
        <label style={{marginLeft:10}}>
          Speed:
          <select onChange={e=> videoRef.current.playbackRate = Number(e.target.value)} defaultValue="1">
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
  )
}
