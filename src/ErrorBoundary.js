import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log({ error, errorInfo });
  }

  render() {
    const { error } = this.state;
    if (error) return <h1>{error.message}</h1>;
    return this.props.children;
  }
}

export default ErrorBoundary;
