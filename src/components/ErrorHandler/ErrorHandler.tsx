import React from "react";
import { useNavigate } from "react-router-dom";

function withNavigate(Component: any) {
  return function Wrapped(props: any) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode; navigate: any },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {
    console.error("UI Error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <h2 className="text-red-600 text-center mt-16 ">
          لقد وقع خطأ ما!
          <p
            onClick={() => this.props.navigate(0)}
            className="text-blue-600 underline cursor-pointer"
          >
            اعادة تحميل الصفحة
          </p>
        </h2>
      );
    }
    return this.props.children;
  }
}

export default withNavigate(ErrorBoundary);

