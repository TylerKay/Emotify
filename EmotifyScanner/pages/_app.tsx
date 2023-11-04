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
import { useState } from "react";
import Landing from "../components/landing/Landing";
import RecommendedPlaylist from "./recommendedPlaylist/recommendedPlaylist"
import Home from "../components/home/Home";


export default function App({ Component, pageProps }: AppProps) {
  const [currentStep, setCurrentStep] = useState(3);


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
          <>Step 1</>
          <Auth>
            <Nav />
            <div>
              <Component {...pageProps} />
            </div>
            <Toolbar />
          </Auth>
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