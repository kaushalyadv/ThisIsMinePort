import React, { useContext } from "react";
import "./Podcast.scss";
import { podcastSection } from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

export default function Podcast() {
  const { isDark } = useContext(StyleContext);

  if (!podcastSection) {
    console.error("podcastSection object for Podcast section is missing");
    return null;
  }

  if (!podcastSection.display) {
    return null;
  }

  return (
    <div className="main">
      <div className="podcast-header" style={{ width: "100%", padding: '2.5em', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h1 className="podcast-header-title">
  <span className="music-emoji">🎵</span> My Music Zone
</h1>

        <p
          className={
            isDark
              ? "light-mode podcast-header-subtitle"
              : "subTitle podcast-header-subtitle"
          }
        >
          {podcastSection.subtitle}
        </p>
      </div>
      <div className="podcast-main-div">
        {podcastSection.podcast?.map((podcastLink, i) => {
          if (!podcastLink) {
            console.log(`Podcast link for ${podcastSection.title} is missing`);
            return null;
          }

          // Extract playlist ID from full URL
          const playlistId = podcastLink.split("/playlist/")[1]?.split("?")[0];
          if (!playlistId) {
            console.error(`Invalid podcast link: ${podcastLink}`);
            return null;
          }
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
                title={`Spotify Playlist ${i + 1}`}
              ></iframe>
            </div>
          );
        })}
      </div>
    </div>
  );
}
