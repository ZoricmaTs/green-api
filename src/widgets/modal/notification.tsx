import './style.scss';
import {useNotificationsContext} from '../../hooks/useNotifications';
import {Notification} from '../../service/api';
import {useNavigate} from 'react-router-dom';
import CloseButton from '../close-button';

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

        const textMessage =notification.body.messageData.typeMessage === 'extendedTextMessage'
          ? notification.body.messageData.extendedTextMessageData?.text
          : notification.body.messageData.textMessageData?.textMessage;

        return <div className={'modal-notification__item'} key={index} onClick={() => openChat(notification)}>
          <p className={'modal-notification__item_text'}>{textMessage}</p>
          <p className={'modal-notification__item_name'}>{name}</p>
          <CloseButton className={'btn btn__icon modal-notification__item_btn'} onClick={(e) => onClose(notification)}/>
        </div>
      })}
    </div>
  </div>
}
