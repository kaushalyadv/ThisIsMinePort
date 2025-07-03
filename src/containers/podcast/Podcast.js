import React, { useContext } from "react";
import "./Podcast.scss";
import { podcastSection } from "../../portfolio";
import { Fade } from "react-reveal";
import StyleContext from "../../contexts/StyleContext";

export default function Podcast() {
  const { isDark } = useContext(StyleContext);

  if (!podcastSection)
    console.error("podcastSection object for Podcast section is missing");

  if (!podcastSection.display) {
    return null;
  }

  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main">
        <div className="podcast-header">
          <h1 className="podcast-header-title">{podcastSection.title}</h1>
          <p
            className={
              isDark
                ? "dark-mode podcast-header-subtitle"
                : "subTitle podcast-header-subtitle"
            }
          >
            {podcastSection.subtitle}
          </p>
        </div>
        <div className="podcast-main-div">
          {podcastSection.podcast.map((podcastLink, i) => {
            if (!podcastLink) {
              console.log(
                `Podcast link for ${podcastSection.title} is missing`
              );
              return null;
            }

            // Extract playlist ID from full URL
            const playlistId = podcastLink.split("/playlist/")[1]?.split("?")[0];
            const embedUrl = `https://open.spotify.com/embed/playlist/${playlistId}`;

            return (
              <div key={i}>
                <iframe
                  className="podcast"
                  src={embedUrl}
                  width="100%"
                  height="152"
                  style={{ borderRadius: "12px", marginTop: "20px" }}
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="Spotify Playlist"
                ></iframe>
              </div>
            );
          })}
        </div>
      </div>
    </Fade>
  );
}
