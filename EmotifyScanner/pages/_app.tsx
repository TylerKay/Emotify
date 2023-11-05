import "../styles/globals.css";
import "@fontsource/poppins";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";

import type { AppProps } from "next/app";
import { Auth } from "../components/menu/Auth";
import Head from "next/head";
import { Nav } from "../components/menu/Nav";
import { Toolbar } from "../components/menu/Toolbar";
import { useState, useEffect } from "react";
import Landing from "../components/landing/Landing";
import RecommendedPlaylist from "./recommendedPlaylist/recommendedPlaylist"
import Home from "../components/home/Home";
import axios from 'axios';
// import backgroundVideo from './color_grade.jpg'; // Import your video file
import backgroundImageUrl from "./image.jpg";


export default function App({ Component, pageProps }: AppProps) {
  const [currentStep, setCurrentStep] = useState(2);


  const [ playlist, setPlaylist ] = useState([]);
  const [ displayHume, setDisplayHume ] = useState(false);
  


  const containerStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundColor: 'white',
    backgroundSize: 'fill',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    position: 'relative',
  };

  const titleStyle = {
    fontSize: '12rem',
    color: '#21de65',
    fontFamily: 'Verdana',
    fontWeight: 'bolder',
    textShadow: '10px 5px 2px rgba(0, 0, 0, 0.8)',
    marginTop: '20px',
    zIndex: 1,
  };

  const buttonStyle = {
    backgroundColor: 'black',
    color: 'white',
    fontSize: '2rem',
    fontFamily: 'Rockwell',
    padding: '10px 50px',
    cursor: 'pointer',
    marginTop: '-100px',
    marginRight: "385px",
    boxShadow: '10px 5px 2px rgba(0, 0, 0, 0.05)',
    zIndex: 1,
  };

  const textContainerStyle = {
    position: 'absolute',
    top: '30%',
    right: '10%', // Adjust the right position
    zIndex: 1,
  };

  const textStyle = {
    fontSize: '30px',
    color: 'black',
    fontFamily: 'Verdana',
    fontWeight: 'bolder',
    alignItem: 'center',
    fontWeight: 'bold',
  };

  async function fetchData() {
    // var valenceScore = 0.5;
    const valenceScore = String(localStorage.getItem('valence_score'));

    axios.get(`http://127.0.0.1:5000/api/create-playlist?valence_score=${valenceScore}`)
        .then((res) => {
            var data = res.data;
            data = data.replace(/'/g, '"');
            console.log(data)
            setPlaylist(JSON.parse(data));
        })
        .catch((error) => {
            console.error(error);
        });
    }

  const scrollToSection = (elementRef, offset = -50) => {
    if (elementRef && elementRef.current) {
      const targetPosition = elementRef.current.offsetTop - offset;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }

      fetchData();

  };

  return (
    <>
      <Head>
        <title>Hume AI | Sandbox</title>
        {/* <meta name="title" content="Hume AI | Sandbox" /> */}
        <meta name="description" content="Hume Sandbox" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-w-screen min-h-screen bg-neutral-100 font-main font-thin text-neutral-800">
        
        {currentStep === 1 ? <>
          {/* <Landing /> */}
          <Home />
        </> : null}

        {currentStep === 2 ? <>
          {/* <Home /> */}
          {/* <Auth>
            <Nav />
            <div>
              <Component {...pageProps} />
            </div>
            <Toolbar />
          </Auth> */}

            {/* <Auth>
        <Nav />
        <div style={{marginBottom: "250px"}}>
        <Component {...pageProps} />
          
          </div>
            <Toolbar />
          </Auth> */}




          {/* HOME PAGE */}
          <div style={containerStyle}>  
            {/* <video
              autoPlay
              muted
              loop
              playsInline
              style={videoStyle}
            > */}
              {/* <source src={backgroundVideo} type="video/mp4" /> */}
            {/* </video> */}
            <h1 style={titleStyle}>EMOTIFY</h1>

            <div style={{ textAlign: 'center', marginTop: '5px' }}>
              <p style={textStyle}>
                A website that uses sentiment analysis<br /> to create a Spotify playlist based on your live emotions
              </p>
            </div>

            {/* <button
              style={buttonStyle}
              onClick={() => scrollToSection(videoRef, 50)} // Adjust the offset to control scrolling distance
            >
              Find your playlist
            </button> */}
            <div style={{ height: '100vh' }}>
            </div>
            {/* <div id="facecam-container" style={{ background: 'none', padding: '20px', zIndex: 1 }}>
              <video ref={videoRef} autoPlay playsInline style={facecamStyle} />
            </div> */}
            <div style={textContainerStyle}>
              <button style={buttonStyle} onClick={() => scrollToSection({ current: { offsetTop: document.body.scrollHeight } }, 0)}>
                See playlist
              </button>
            </div>

            <div style={{ height: '120vh' }}>


          <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <Auth>
              <Nav />
              <Component {...pageProps} />
            </Auth>
            <Toolbar />
         </div>

         <div>
          {playlist.length > 0 ? 
            <div>
              {playlist.map((item, index) => (
                <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                  <img src={item.image} style={{ width: "100px", height: "100px", marginRight: "10px" }} />
                  <div>
                    <p style={{ color: "black", fontSize: "16px" }}>{item.name} - {item.artist}</p>
                  </div>
                </div>
              ))}
            </div>
            : null}
        </div>

         
       </div>
      </div>

          {/* <Auth>
              <Nav />
              <div style={{marginBottom: "250px"}}>
                <Component {...pageProps} />
                
              </div>
              <Toolbar />
            </Auth> */}

          

          
        </> : null}


        {currentStep === 3 ? 
          <>
            <div>
              <RecommendedPlaylist />
            </div>
          </> : null}
        
      </div>

      
    </>
  );
}