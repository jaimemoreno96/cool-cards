'use client';

import { createContext, useContext, ReactNode, useMemo } from 'react';
import { ApiGateway } from '../index';

interface ApiGatewayContextValue {
  gateway: ApiGateway;
}

const ApiGatewayContext = createContext<ApiGatewayContextValue | null>(null);

interface ApiGatewayProviderProps {
  children: ReactNode;
  config?: {
    baseURL?: string;
    authToken?: string;
    onAuthError?: (error: any) => void;
    onError?: (error: any) => void;
  };
}

export function ApiGatewayProvider({ children, config }: ApiGatewayProviderProps) {
  const gateway = useMemo(() => {
    return new ApiGateway(config);
  }, [config]);

  return (
    <ApiGatewayContext.Provider value={{ gateway }}>
      {children}
    </ApiGatewayContext.Provider>
  );
}

export function useApiGateway() {
  const context = useContext(ApiGatewayContext);
  if (!context) {
    throw new Error('useApiGateway must be used within an ApiGatewayProvider');
  }
  return context.gateway;
}

export function useProjects() {
  const context = useContext(ApiGatewayContext);
  return context?.gateway?.projects;
}

export function useBoards() {
  const context = useContext(ApiGatewayContext);
  return context?.gateway?.boards;
}

export function useUsers() {
  const context = useContext(ApiGatewayContext);
  return context?.gateway?.users;
}