import './style.scss';
import {useNotificationsContext} from '../../hooks/useNotifications';
import {Notification} from '../../service/api';
import {useNavigate} from 'react-router-dom';

export default function ModalNotification() {
  const navigate = useNavigate();

  const openChat = (notification: Notification) => {
    removeNotification(notification);
    const phone = notification.body.senderData.chatId.split('@')[0];

    navigate(`/chat/+${phone}`);
  };

  const onClose = (notification: Notification) => {
    removeNotification(notification);
  };

  const { notifications, removeNotification } = useNotificationsContext();

  return <div className={'modal-notification'}>
    <div className={'modal-notification__text-wrapper'}>
      {notifications.map((notification, index) => {
        const name = notification.body.senderData.senderContactName ? notification.body.senderData.senderContactName : notification.body.senderData.senderName;

        return <div className={'modal-notification__item'} key={index} onClick={() => openChat(notification)}>
          <p className={'modal-notification__item_text'}>{notification.body.messageData.textMessageData.textMessage}</p>
          <p className={'modal-notification__item_name'}>{name}</p>
          <button onClick={() => onClose(notification)}>{'close'}</button>
        </div>
      })}
    </div>
  </div>
}