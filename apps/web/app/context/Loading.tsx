'use client';

import { LoadingOverlay } from 'global/components/ui/loadingOverlay';
import { createContext, useState } from 'react';

type LoadingContext = {
  isLoading: boolean;
  withLoading: (f: () => Promise<unknown>) => Promise<unknown>;
};

export const Loading = createContext<LoadingContext>({} as LoadingContext);

const LoadingProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(false);

  const withLoading = async (f: () => Promise<unknown>) => {
    setLoading(true);
    const res = await f();
    setTimeout(() => setLoading(false), 1000);

    return res;
  };

  return (
    <Loading.Provider value={{ isLoading, withLoading }}>
      <LoadingOverlay className={isLoading ? 'flex' : 'hidden'} />
      {children}
    </Loading.Provider>
  );
};

export default LoadingProvider;
