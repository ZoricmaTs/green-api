import React, {useEffect} from 'react';
import './App.scss';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Authentication from './pades/authentication';
import ChatList from './pades/chat-list';
import {useIdInstanceContext} from './hooks/useIdInstance';
import {useApiTokenContext} from './hooks/useApiToken';
import Chat from './pades/chat';
import {getNotification} from './service/api';
import AuthWrapper from './widgets/auth-wrapper';
import {useNotificationsContext} from './hooks/useNotifications';
import {useApiUrlContext} from './hooks/useApiUrl';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Authentication/>,
  },
  {
    path: "/chat-list",
    element: <AuthWrapper><ChatList/></AuthWrapper>,
  },
  {
    path: "/chat/:phone",
    element: <AuthWrapper><Chat/></AuthWrapper>,
  }
]);

function App() {
  const { idInstance } = useIdInstanceContext();
  const { apiToken } = useApiTokenContext();
  const { apiUrl } = useApiUrlContext();
  const { addNotification } = useNotificationsContext();

  useEffect(() => {
    let isEffectCancelled = false;
    let timeoutId: number;

    function notificationsLoop() {
      getNotification({apiToken, idInstance: idInstance as string, apiUrl})
        .then((response) => {
          if (!isEffectCancelled) {
            notificationsLoop();
          }

          if (response && response.body?.typeWebhook === 'incomingMessageReceived') {
            addNotification(response);
          }
        }, (error) => {
          if(!isEffectCancelled) {
            timeoutId = window.setTimeout(notificationsLoop, 100000);
          }
        });
    }

    if (idInstance && apiToken) {
      notificationsLoop();
    }

    return () => {
      isEffectCancelled = true;
      window.clearTimeout(timeoutId);
    }

  }, [addNotification, apiToken, apiUrl, idInstance]);

  return (
    <div className="App">
      <RouterProvider router={router}/>
      <div id={'modal-wrapper'} className={'modal-wrapper'}/>
    </div>
  );
}

export default App;
