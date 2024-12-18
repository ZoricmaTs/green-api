import './style.scss';
import {useIdInstanceContext} from '../../hooks/useIdInstance';
import {useApiTokenContext} from '../../hooks/useApiToken';
import TextArea, {TextAreaHandler} from '../../widgets/input/textArea';
import Header from '../../widgets/header';
import React, {FormEvent, useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {getMessages, MessageDataType, MessageType, Notification, SendMessage} from '../../service/api';
import {useNotificationsContext} from '../../hooks/useNotifications';
import {createPortal} from 'react-dom';
import ModalNotification from '../../widgets/modal/notification';
import {ContactType, useContactsContext} from '../../hooks/useContacts';
import {useApiUrlContext} from '../../hooks/useApiUrl';
import {useErrorsContext} from '../../hooks/useError';
import ModalError from '../../widgets/modal/error';

export function getFormattedTimeHM(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`;
}

export default function Chat(props: any) {
  const { idInstance } = useIdInstanceContext();
  const { apiToken } = useApiTokenContext();
  const { apiUrl } = useApiUrlContext();
  const { contacts, setContacts } = useContactsContext();
  const { errors, setErrors } = useErrorsContext();

  const { addInterceptor, removeInterceptor } = useNotificationsContext();
  const [isSending, setSending] = useState<boolean>(false);
  const phone = (window.location.pathname).split('/').at(-1)!;
  const chatId = phone?.split('+').at(-1) + '@c.us';
  const [messages, setMessages] = useState<MessageDataType[]>([]);

  const textAreaRef = useRef<TextAreaHandler>();
  const messagesRef = useRef<HTMLDivElement>(null);
  const isScrolledToEndBeforePaste = useRef(true);

  const addMessagesGratefully = useCallback((newMessages: MessageDataType[]) => {
    const scroller = messagesRef.current;
    if (scroller) {
      isScrolledToEndBeforePaste.current = scroller.scrollTop + scroller.offsetHeight >= scroller.scrollHeight;
    }

    setMessages(prevState => [...prevState, ...newMessages]);
  }, []);

  useEffect(() => {
    const currContact = contacts.find((contact: ContactType) => String(contact.phone) === phone);

    if (!currContact) {
      setContacts([...contacts, {phone}])
    }
  }, [contacts, phone, setContacts]);

  useEffect(() => {
    const handler = (notification: Notification) => {
      if (notification.body.senderData.chatId === chatId) {
        const textMessage =notification.body.messageData.typeMessage == 'extendedTextMessage'
          ? notification.body.messageData.extendedTextMessageData?.text
          : notification.body.messageData.textMessageData?.textMessage
        const message: MessageDataType = {
          type: MessageType.INCOMING,
          textMessage: textMessage || 'Failed to get message text',
          timestamp: notification.body.timestamp,
        }

        addMessagesGratefully([message]);

        return true;
      }

      return false;
    };
    
    addInterceptor(handler);
    
    return () => {
      removeInterceptor(handler);
    }
  }, [addInterceptor, chatId, messages, removeInterceptor, addMessagesGratefully]);

  useEffect(() => {
    getMessages({chatId, apiUrl, apiToken, idInstance: idInstance as string, count: 20})
      .then((response: MessageDataType[]) => {
        addMessagesGratefully(response.reverse());
      }, (error) => {
        setErrors([...errors, error]);
      })
  }, [addMessagesGratefully, apiToken, apiUrl, chatId, idInstance]);

  useLayoutEffect(() => {
    if (isScrolledToEndBeforePaste.current && messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.offsetHeight;
    }
  }, [messages]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData: {[key: string]: string | number | File | File[]} = {};

    new FormData(form).forEach((value, key) => {
      formData[key] = value;
    });

    const textMessage = formData['message'] as string;
    if (textMessage.length > 0) {
      SendMessage({
        chatId,
        message: textMessage,
        idInstance: idInstance as string,
        apiToken,
        apiUrl,
      }).then(() => {
        setSending(true);

        const message: MessageDataType = {
          type: MessageType.OUTGOING,
          textMessage,
          timestamp: + new Date() / 1000,
        };

        addMessagesGratefully([message]);
        textAreaRef.current?.setValue('');
      }, (error) => {
        setErrors([...errors, error]);
      });
    }
  };

  return <div className={'scene chat'} >
    <Header title={phone}/>
    <div className={'messages'} ref={messagesRef}>
      {messages && messages.map((message: MessageDataType, index: number) => {
        return <div key={`message-${index}`} className={`${message.type} messages__item ${messages[index - 1]?.type !== message.type ? 'first' : ''}`}>
          <p>{message.textMessage}</p>
          <p className={'messages__item_time'}>{getFormattedTimeHM(message.timestamp)}</p>
        </div>
      })}
    </div>
    <form className={'chat__form'} onSubmit={onSubmit}>
      <TextArea name={'message'} row={1} ref={textAreaRef}/>
      <button type={'submit'} className={'chat__form_btn btn'}>{'отправить'}</button>
    </form>

    {createPortal(<ModalNotification/>, document.getElementById('modal-wrapper')!)}
    {errors.length > 0 && createPortal(<ModalError/>, document.getElementById('modal-wrapper')!)}
  </div>;
}
