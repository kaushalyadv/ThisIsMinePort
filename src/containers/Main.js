import React, { useEffect, useState, useRef } from "react";
import Header from "../components/header/Header";
import Greeting from "./greeting/Greeting";
import Skills from "./skills/Skills";
import StackProgress from "./skillProgress/skillProgress";
import Projects from "./projects/Projects";
import StartupProject from "./StartupProjects/StartupProject";
import Achievement from "./achievement/Achievement";
import Blogs from "./blogs/Blogs";
import Footer from "../components/footer/Footer";
import Talks from "./talks/Talks";
import Podcast from "./podcast/Podcast";
import Education from "./education/Education";
import ScrollToTopButton from "./topbutton/Top";
// import Twitter from "./twitter-embed/twitter";
import Profile from "./profile/Profile";
import SplashScreen from "./splashScreen/SplashScreen";
import GraphicShowcase from "./GraphicShowcase/GraphicShowcase.js";
import { splashScreen } from "../portfolio";
import { StyleProvider } from "../contexts/StyleContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
import "./Main.scss";
import ThreeDBackground from '../components/ThreeDBackground.jsx';
import KaushalGPTChat from '../components/KaushalGPTChat.js';
import KaushalGPTWidget from "../components/KaushalGPTWidget.js";
import CareerJourney from "./CareerJourney/CareerJourney.jsx";

const Main = () => {
  const darkPref = window.matchMedia("(prefers-color-scheme: dark)");
  const [isDark, setIsDark] = useLocalStorage("isDark", darkPref.matches);
  const [isShowingSplashAnimation, setIsShowingSplashAnimation] = useState(true);

  // Create a ref for the main scrollable content container
  const mainContentRef = useRef(null);
  // State to store the scroll position of the main content container
  const [scrollPosition, setScrollPosition] = useState(0);

  // Effect for splash screen animation
  useEffect(() => {
    if (splashScreen.enabled) {
      const splashTimer = setTimeout(
        () => setIsShowingSplashAnimation(false),
        splashScreen.duration
      );
      return () => {
        clearTimeout(splashTimer);
      };
    }
  }, []);

  // Effect to attach and clean up the scroll listener
  useEffect(() => {
    const currentRef = mainContentRef.current;
    if (currentRef) {
      const handleScroll = () => {
        setScrollPosition(currentRef.scrollTop);
      };
      currentRef.addEventListener('scroll', handleScroll);
      // Set initial scroll position
      setScrollPosition(currentRef.scrollTop);
      return () => {
        currentRef.removeEventListener('scroll', handleScroll);
      };
    }
  }, []); // Empty dependency array means this runs once on mount

  const changeTheme = () => {
    setIsDark(!isDark);
  };
    
  return (
    // This div will now be the scrollable container
    <div 
      className={isDark ? "dark-mode" : "light-mode-main-container"}
      ref={mainContentRef} // Attach the ref here
      style={{
        height: '100vh', // Make this div fill the viewport height
        overflowY: 'auto', // Make this div scrollable
        position: 'relative', // Necessary for z-index context with fixed background
        // Remove background-color here if it's conflicting with the 3D background
        // The background color should be applied to the inner .main div if needed
      }}
    >
      {/* ThreeDBackground is a sibling to the main content, positioned fixed behind it */}
      {/* Pass the scrollPosition to ThreeDBackground */}
      <ThreeDBackground scrollPosition={scrollPosition} /> 

      {/* This div will contain all your main website content */}
      {/* It needs the 'main' class to apply the z-index and background color */}
      <div className="main"> 
        {/* <video
  className="bg-video"
  autoPlay
  muted
  loop
  playsInline
>
  <source src={Final_cut} type="video/mp4" />
</video> */}

        <StyleProvider value={{ isDark: isDark, changeTheme: changeTheme }}>
          {isShowingSplashAnimation && splashScreen.enabled ? (
            <SplashScreen />
          ) : (
            <>
              <Header />
              {/* <KaushalGPTChat /> */}
              <KaushalGPTWidget />
              <Greeting />
              <Skills />
              <StackProgress />
              <Education />
              <Projects />
              <StartupProject />
              <GraphicShowcase/>
              <Achievement />
              <CareerJourney />
              <Blogs />
              <Talks />
              {/* <Twitter /> */}
              <Podcast />
              <Profile />
              <Footer />
              <ScrollToTopButton />
            </>
          )}
        </StyleProvider>
      </div>
    </div>
  );
};

export default Main;
