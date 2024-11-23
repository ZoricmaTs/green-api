import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {IdInstanceProvider} from './hooks/useIdInstance';
import {ContactsProvider} from './hooks/useContacts';
import {ApiTokenProvider} from './hooks/useApiToken';
import {NotificationProvider} from './hooks/useNotifications';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <IdInstanceProvider>
    <ApiTokenProvider>
      <ContactsProvider>
        <NotificationProvider>
          <App/>
        </NotificationProvider>
      </ContactsProvider>
    </ApiTokenProvider>
  </IdInstanceProvider>
);
