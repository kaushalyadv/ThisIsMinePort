import React, { useContext } from "react";
import "./Button.scss";
import StyleContext from "../../contexts/StyleContext";


export default function Button({ text, className, href, newTab }) {
  const { isDark } = useContext(StyleContext);
  return (
    <div className={className}>
      <a 
        className={isDark ? "main-button" : " light-mode main-button"} 
        href={href} 
        target={newTab ? "_blank" : "_self"} 
        rel={newTab ? "noopener noreferrer" : undefined} 
      >
        {text}
      </a>
    </div>
  );
}
