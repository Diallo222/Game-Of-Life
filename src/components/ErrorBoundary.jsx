import React, { Component } from "react";
import { SiRetroarch } from "react-icons/si";
import Loader from "./Loader";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-screen h-screen bg-black flex flex-col items-center z-30 justify-center space-y-4">
          <SiRetroarch className="text-9xl text-red-600 animate-bounce" />
          <h1 className="text-4xl text-red-600 font-bold">An error occurred</h1>
          <p className="text-2xl text-white">Please refresh the page</p>
        </div>
      );
    }

    return (
      <React.Suspense fallback={<Loader />}>
        {this.props.children}
      </React.Suspense>
    );
  }
}

export default ErrorBoundary;
