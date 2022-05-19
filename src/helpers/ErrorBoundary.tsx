import { Component, ErrorInfo, ReactNode } from 'react'

interface ErrorBoundryProps {
  children: ReactNode
  fallback: ReactNode
}

interface ErrorBoundryState {
  hasError: boolean
}

// TODO - This is just a cut and paste which I don't understand
export class ErrorBoundary extends Component<ErrorBoundryProps, ErrorBoundryState> {
  public state: ErrorBoundryState = {
    hasError: false,
  }

  public static getDerivedStateFromError(_: Error): ErrorBoundryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}
