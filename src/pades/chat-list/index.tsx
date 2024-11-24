import {useContactsContext} from '../../hooks/useContacts';
import './style.scss';
import Modal from '../../widgets/modal';
import React, {useState} from 'react';
import {createPortal} from 'react-dom';
import {useNavigate} from 'react-router-dom';
import ModalNotification from '../../widgets/modal/notification';
import ModalError from '../../widgets/modal/error';
import {useErrorsContext} from '../../hooks/useError';

export default function ChatList() {
  const { contacts, setContacts } = useContactsContext();
  const { errors, setErrors } = useErrorsContext();

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const onClose = () => {
    setOpen(false);
  }

  const addContact = (value: string) => {
    setOpen(false);
    const phone = value;
    const existingContact = contacts.find((contact) => contact.phone === phone);

    if (!existingContact) {
      setContacts([...contacts, {phone}]);
    }

    navigate(`/chat/${phone}`);
  }

  return <div className={'scene'}>
    {contacts.length === 0
      ? <h2 className={'chat-list__text'}>{'Начните переписку'}</h2>
      : <div>
        {contacts.map((contact, index) => {
          return <div className={'chat-list__item'} key={`contact-${index}`} onClick={() => navigate(`/chat/${contact.phone}`)}>{contact.phone}</div>
        })}
      </div>
    }
    <button className={'btn chat-list__btn'} onClick={() => setOpen(true)}>{'создать чат'}</button>
    {open && createPortal(
      <Modal onClose={onClose} addContact={addContact}/>,
      document.getElementById('modal-wrapper')!
    )}

    {createPortal(<ModalNotification/>, document.getElementById('modal-wrapper')!)}
    {errors.length > 0 && createPortal(<ModalError/>, document.getElementById('modal-wrapper')!)}
  </div>
}