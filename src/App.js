import React from "react";
import "./App.scss";
import Main from "./containers/Main";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <Main />
    </ErrorBoundary>
  );
}

export default App;
