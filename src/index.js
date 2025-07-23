import React from "react";
import ReactDOM from 'react-dom/client'; // This import is correct for React 18+
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import ErrorBoundary from "./components/ErrorBoundary";

// This is the old ReactDOM.render method, which is deprecated in React 18 and removed in React 19.
// You need to use ReactDOM.createRoot and root.render instead.
// ReactDOM.render(<App />, document.getElementById("root"));

// Corrected React 18+ rendering method:
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();