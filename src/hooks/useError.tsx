import React, {createContext, ReactNode, useContext, useState} from 'react';

export type ErrorType = unknown;

export type ErrorsContextType = {
  errors: ErrorType[];
  setErrors: (errors: ErrorType[]) => void;
};

export const ErrorsContext = createContext<ErrorsContextType | undefined>(undefined);

export const ErrorsProvider = ({ children }: { children: ReactNode }) => {
  const [errors, setErrors] = useState<ErrorType[]>([]);

  return <ErrorsContext.Provider value={{errors, setErrors}}>
    {children}
  </ErrorsContext.Provider>;
};



export const useErrorsContext = (): ErrorsContextType => {
  const context = useContext(ErrorsContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
};