import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            textAlign: "center",
            marginTop: "20vh",
            color: "#333",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <h1>🚧 Site Under Construction 🚧</h1>
          <p>We’re fixing things, please check back soon.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
