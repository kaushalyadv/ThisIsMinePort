import React, {useContext} from "react";
import "./Footer.scss";
import {Fade} from "react-reveal";
import emoji from "react-easy-emoji";
import StyleContext from "../../contexts/StyleContext";

export default function Footer() {
  const {isDark} = useContext(StyleContext);
  return (
    <Fade bottom duration={1000} distance="5px">
      <div className="footer-div">
        <p className={isDark ? "dark-mode footer-text" : "footer-text"}>
          {emoji("MADE BY MYSELF AS A SMALL REPRESENTATION OF MY SKILLS AND LEARNING")}
        </p>
        <p className={isDark ? "dark-mode footer-text" : "footer-text"}>
          Crafted by ☕ {" "}
          <a
            href="https://github.com/kaushalyadv"
            target="_blank"
            rel="noreferrer"
          >
            Kaushal Yadav
          </a>
        </p>
      </div>
    </Fade>
  );
}
