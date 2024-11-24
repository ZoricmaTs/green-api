import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {IdInstanceProvider} from './hooks/useIdInstance';
import {ContactsProvider} from './hooks/useContacts';
import {ApiTokenProvider} from './hooks/useApiToken';
import {NotificationProvider} from './hooks/useNotifications';
import {ApiUrlProvider} from './hooks/useApiUrl';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ApiUrlProvider>
    <IdInstanceProvider>
      <ApiTokenProvider>
        <ContactsProvider>
          <NotificationProvider>
            <App/>
          </NotificationProvider>
        </ContactsProvider>
      </ApiTokenProvider>
    </IdInstanceProvider>
  </ApiUrlProvider>
);
