import React, {useContext} from "react";
import "./Achievement.scss";
import AchievementCard from "../../components/achievementCard/AchievementCard";
import {achievementSection} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

export default function Achievement() {
  const {isDark} = useContext(StyleContext);
  if (!achievementSection.display) {
    return null;
  }
  return (
    <div className="main" id="achievements">
      <div className="achievement-main-div" style={{padding: '5%'}}>
        <div className="achievement-header" style={{lineHeight: '2.5em'}}> 
          <h1
            className={
              isDark
                ? "light-mode heading achievement-heading"
                : "heading achievement-heading"
            }
            style={{display: 'flex', justifyContent: 'center'}}
          >
            {achievementSection.title}
          </h1>
          <p
            className={
              isDark
                ? "light-mode subTitle achievement-subtitle"
                : "subTitle achievement-subtitle"
            }
          >
            {achievementSection.subtitle}
          </p>
        </div>
        <div className="achievement-cards-div">
          {achievementSection.achievementsCards.map((card, i) => {
            return (
              <AchievementCard
                key={i}
                isDark={isDark}
                cardInfo={{
                  title: card.title,
                  description: card.subtitle,
                  image: card.image,
                  imageAlt: card.imageAlt,
                  footer: card.footerLink
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}