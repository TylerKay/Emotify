// Facecam.js
import React, { useEffect, useRef } from 'react';

function Facecam() {
  const videoRef = useRef();

  const moodStyle = {
    fontSize: '5rem',
    color: '#21de65',
    fontFamily: 'Verdana',
    fontWeight: 'bolder',
    textShadow: '10px 5px 2px rgba(0, 0, 0, 0.8)',
    marginTop: '-10px',
  };

  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing webcam:', error);
      }
    };

    startWebcam();
  }, []);

  return (
    <div id="facecam-container" style={{ minHeight: '100vh' }}>
      <h2 style={moodStyle}>Mood: </h2>
      <video ref={videoRef} autoPlay playsInline />
    </div>
  );
}

export default Facecam;
