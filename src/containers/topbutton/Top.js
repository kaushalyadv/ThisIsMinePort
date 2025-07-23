import React, { useEffect } from "react";
import "./Top.scss";

export default function Top() {
  function TopEvent() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  function scrollFunction() {
    const topButton = document.getElementById("topButton");
    if (!topButton) return; // Prevent errors if button is not in the DOM

    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      topButton.style.visibility = "visible";
    } else {
      topButton.style.visibility = "hidden";
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", scrollFunction);
    window.addEventListener("load", scrollFunction);

    return () => {
      window.removeEventListener("scroll", scrollFunction);
      window.removeEventListener("load", scrollFunction);
    };
  }, []);

  return (
    <button onClick={TopEvent} id="topButton" title="Go to top" style={{ visibility: "hidden" }}>
      <i className="fas fa-hand-point-up" aria-hidden="true"></i>
    </button>
  );
}
