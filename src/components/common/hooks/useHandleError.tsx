import {useContext} from 'react';
import {ErrorBoundaryContext} from 'common/context';

export const useHandleError = () => useContext(ErrorBoundaryContext);
