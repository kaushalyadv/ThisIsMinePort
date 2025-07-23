import React, {useContext} from "react";
import "./Footer.scss";
import emoji from "react-easy-emoji";
import StyleContext from "../../contexts/StyleContext";

export default function Footer() {
  const {isDark} = useContext(StyleContext);
  return (
    <div className="footer-div">
      <p className={isDark ? "light-mode footer-text" : "footer-text"}>
        {emoji("MADE BY MYSELF AS A SMALL REPRESENTATION OF MY SKILLS AND LEARNING")}
      </p>
      <p className={isDark ? "light-mode footer-text" : "footer-text"}>
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
  );
}