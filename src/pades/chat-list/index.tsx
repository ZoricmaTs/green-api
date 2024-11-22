import {useIdInstanceContext} from '../../hooks/useIdInstance';
import {useApiTokenContext} from '../../hooks/useApiToken';
import {useContactsContext} from '../../hooks/useContacts';
import './style.scss';
import Modal from '../../widgets/modal';
import {useState} from 'react';
import {createPortal} from 'react-dom';

export default function ChatList() {
  const { idInstance, setIdInstance } = useIdInstanceContext();
  const { apiToken, setApiToken } = useApiTokenContext();
  const { contacts, setContacts } = useContactsContext();
  const [open, setOpen] = useState(false);

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
  }

  return <div className={'scene'}>
    {contacts.length === 0
      ? <h2 className={'chat-list__text'}>{'Начните переписку'}</h2>
      : <div>
        {contacts.map((contact, index) => {
          return <div className={'chat-list__item'} key={`contact-${index}`}>{contact.phone}</div>
        })}
      </div>
    }
    <button className={'btn chat-list__btn'} onClick={() => setOpen(true)}>{'создать чат'}</button>
    {open && createPortal(
      <Modal onClose={onClose} addContact={addContact}/>,
      document.getElementById('modal-wrapper')!
    )}
  </div>
}