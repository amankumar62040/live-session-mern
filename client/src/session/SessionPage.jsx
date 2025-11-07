import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function SessionPage(){
  const { unique_id } = useParams();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchSession = async ()=>{
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE || 'http://localhost:5000'}/api/sessions/${unique_id}`);
        setSession(res.data.session);
      } catch (err) {
        console.error(err);
        alert('Session not found or error');
      } finally {
        setLoading(false);
      }
    }
    fetchSession();
  },[unique_id]);

  if(loading) return <div>Loading...</div>;
  if(!session) return <div>Session not found</div>;

  return (
    <div style={{padding:20}}>
      <h1>Live Session (Student)</h1>
      <p><strong>Session:</strong> {session.unique_id}</p>
      <VideoPlayer src={import.meta.env.VITE_SAMPLE_VIDEO||'https://www.w3schools.com/html/mov_bbb.mp4'} />
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
      <video ref={videoRef} src={src} controls style={{width:'100%', maxWidth:900}} />
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
