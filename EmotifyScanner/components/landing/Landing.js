import { useRef } from 'react';
// import "./Landing.css";

function Landing() {
  const emotify = useRef(null);
  const playlist = useRef(null);

  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: 'smooth'
    })
  }
  return (
    <div className = "Landing">
      <div className= "hero">
        <h1>Emotify</h1>
        <ul>
          <li onClick={() => scrollToSection(emotify)} className="link">
            Click to Find your playlist today!
          </li>
          {/* <li onClick={() => scrollToSection(playlist)} className="link">
            Here are your Playlists:
          </li> */}
        </ul>
      </div>
      <div ref={emotify} className="emotify">
        <h3>Emotify</h3>
      </div>
      <div ref={playlist} className="emotify">
        <h3>Playlist</h3>
      </div>
    </div>

  );
}

export default Landing;
