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
          href="https://www.linkedin.com/in/kaushal-yadav-38a167201/"
          target="_blank"
          rel="noreferrer"
          style={{color: "white"}}
        >
          Kaushal Yadav_ 
        </a>
        <a>
          &
        </a>
        <a
          href="https://www.linkedin.com/in/anjali-gaira-93413b2b9/"
          target="_blank"
          rel="noreferrer"
          style={{color: "white"}}
        >
          _Anjali Gaira
        </a>
      </p>
    </div>
  );
}