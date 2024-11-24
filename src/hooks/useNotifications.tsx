import React, {createContext, ReactNode, useCallback, useContext, useState} from 'react';
import {Notification} from '../service/api';

// Returns FALSE if notification WAS NOT handled and TRUE if it WAS handled
type Interceptor = (notification: Notification) => boolean;

export type NotificationContextType = {
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  removeNotification: (notification: Notification) => void;
  addInterceptor: (interceptor: (notification: Notification) => boolean) => void;
  removeInterceptor: (interceptor: Interceptor) => void;
};

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [interceptors, setInterceptors] = useState<Interceptor[]>([]);

  return <NotificationContext.Provider value={{
    notifications,
    setNotifications,
    addNotification: useCallback((notification) => {
      let isHandled = false;

      for (let interceptor of interceptors) {
        isHandled = interceptor(notification) || isHandled;
      }

      if (!isHandled) {
        setNotifications([...notifications, notification]);
      }
    }, [interceptors, notifications]),
    removeNotification: useCallback((notification) => {
      setNotifications(prevState => prevState.filter((n) => n !== notification));
    }, []),
    addInterceptor: useCallback((interceptor: Interceptor) => {
      setInterceptors(prevState => [...prevState, interceptor]);
    }, []),
    removeInterceptor: useCallback((interceptor: Interceptor) => {
      setInterceptors(prevState => prevState.filter((i) => i !== interceptor));
    }, []),
  }}>
    {children}
  </NotificationContext.Provider>;
};

export const useNotificationsContext = (): NotificationContextType => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
