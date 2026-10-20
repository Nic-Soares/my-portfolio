import { Component, type ErrorInfo, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import SomethingWentWrong from "@/app/pages/SomethingWentWrong/SomethingWentWrong.tsx";

interface BoundaryProps {
  children: ReactNode;
  resetKey: string;
}

interface BoundaryState {
  hasError: boolean;
}

// Catches render errors in the pages and shows the 500 state in their place,
// so the navigation stays usable. Cleared by Try again or any navigation.
class Boundary extends Component<BoundaryProps, BoundaryState> {
  override state: BoundaryState = { hasError: false };

  static getDerivedStateFromError(): BoundaryState {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack);
  }

  override componentDidUpdate(prevProps: BoundaryProps) {
    if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false });
    }
  }

  override render() {
    if (this.state.hasError) {
      return (
        <SomethingWentWrong
          onRetry={() => this.setState({ hasError: false })}
        />
      );
    }
    return this.props.children;
  }
}

// location.key changes on every navigation, including to the same path
const ErrorBoundary = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  return <Boundary resetKey={location.key}>{children}</Boundary>;
};

export default ErrorBoundary;
