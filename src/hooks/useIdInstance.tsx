import React, {createContext, ReactNode, useContext, useState} from 'react';

export type ApiTokenContextType = {
  idInstance: number;
  setIdInstance: (id: number) => void;
};

export const IdInstanceContext = createContext<ApiTokenContextType | undefined>(undefined);

export const IdInstanceProvider = ({ children }: { children: ReactNode }) => {
  const [idInstance, setIdInstance] = useState<number>(0);

  return <IdInstanceContext.Provider value={{idInstance, setIdInstance}}>
    {children}
  </IdInstanceContext.Provider>;
};



export const useIdInstanceContext = (): ApiTokenContextType => {
  const context = useContext(IdInstanceContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};