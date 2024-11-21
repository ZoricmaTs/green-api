import React, {createContext, FormEvent, ReactNode, useEffect, useState} from 'react';
import './App.scss';
import {getNotification, SentMessage} from './service/api';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Authentication from './pades/authentication';
import ChatList from './pades/chat-list';
import {AppProvider} from './hooks/useidInstance';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Authentication/>,
  },
  {
    path: "/chat-list",
    element: <ChatList/>,
  }
]);

function App() {
  const [isSending, setSending] = useState(false);

  useEffect(() => {
    let send = isSending;

    if (!send) return;

    // getNotification()
    //   .then((res) => {
    //     if (send) {
    //       getNotification();
    //     }
    //     console.log('res', res)
    //   })
    //   .catch((res) => {
    //     if(send){
    //       getNotification()
    //     }
    //   });

    return () => {
      send = false;
    }
  }, [isSending]);


  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData: {[key: string]: string | number | File | File[]} = {};

    new FormData(form).forEach((value, key) => {
      formData[key] = value;
      console.log('key', key)
    });

    SentMessage('79234036057@c.us', (formData['message'] as string));
  }

  return (
    <div className="App">
      <AppProvider>
        <RouterProvider router={router}/>
      </AppProvider>
      {/*<div id={'modal-wrapper'} style={{width: '100%', maxHeight: '100%', position: 'fixed', zIndex: 1200}}/>*/}
    </div>
  );
}

export default App;

// <div className="App">
//   <Header />
// {/*<div style={{width: '100%', height: '100%', position: 'relative'}}>*/}
// {/*  <div className={'header'}>*/}
// {/*    <button className={'header__btn_back'}>{'back'}</button>*/}
// {/*    <div className={'header__image'}>*/}
// {/*    </div>*/}
// {/*    <div className={'header__user-info'}>*/}
// {/*      {'fdgdfgdfgdfg'}*/}
// {/*    </div>*/}
// {/*  </div>*/}
//
// {/*  <form className={'input'} onSubmit={onSubmit}>*/}
// {/*    <textarea aria-multiline={true} name={'message'} rows={1} className={'input__text'}/>*/}
// {/*    <button type={'submit'}>{'sent'}</button>*/}
// {/*  </form>*/}
// {/*</div>*/}
// {/*<button onClick={() => setSending(!isSending)}>{isSending ? 'stop' : 'start'}</button>*/}
// </div>

// {
//   "receiptId": 1,
//   "body": {
//   "typeWebhook": "incomingMessageReceived",
//     "instanceData": {
//     "idInstance": 7103153069,
//       "wid": "996998098583@c.us",
//       "typeInstance": "whatsapp"
//   },
//   "timestamp": 1732207239,
//     "idMessage": "3FCAA3DA8CE934AA2CBA",
//     "senderData": {
//     "chatId": "79234036057@c.us",
//       "chatName": "Женя Миллер",
//       "sender": "79234036057@c.us",
//       "senderName": "Евгений",
//       "senderContactName": "Женя Миллер"
//   },
//   "messageData": {
//     "typeMessage": "extendedTextMessage",
//       "extendedTextMessageData": {
//       "text": "Пипец капец",
//         "description": "",
//         "title": "",
//         "previewType": "None",
//         "jpegThumbnail": "",
//         "forwardingScore": 0,
//         "isForwarded": false
//     }
//   }
// }
// }