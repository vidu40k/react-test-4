import {Component, type ComponentType, type ReactNode} from 'react';
import {ErrorBoundaryContext} from 'common/context';
import {AppError} from 'utils/handler';

export type FallbackComponentProps = {
  error: Error | AppError;
  resetError: () => void;
};

export type Props = {
  children: Exclude<NonNullable<ReactNode>, string | number | boolean>;
  FallbackComponent: ComponentType<FallbackComponentProps>;
  onError?: (error: Error, stackTrace: string) => void;
};

type State = {hasError: Error | AppError | null};

export default class ErrorBoundary extends Component<Props, State> {
  state: State = {hasError: null};

  static getDerivedStateFromError(hasError: Error): State {
    return {hasError};
  }

  sendCrashlytics = (error: Error) => {
    // crashlytics().recordError(error);
  };

  componentDidCatch(error: Error, info: {componentStack: string}) {
    this.sendCrashlytics(error);
  }

  resetError: () => void = () => {
    this.setState({hasError: null});
  };

  setError = (error: AppError) => {
    this.sendCrashlytics(error);
    this.setState({hasError: error});
  };

  render() {
    const {FallbackComponent} = this.props;
    return (
      <ErrorBoundaryContext.Provider value={{setError: this.setError}}>
        {this.state.hasError ? (
          <FallbackComponent
            error={this.state.hasError}
            resetError={this.resetError}
          />
        ) : (
          this.props.children
        )}
      </ErrorBoundaryContext.Provider>
    );
  }
}
