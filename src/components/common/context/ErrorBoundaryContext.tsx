import {createContext} from 'react';

type Context = {
  setError: (error: Error) => void;
};

export const ErrorBoundaryContext = createContext<Context>({
  setError: () => {},
});
