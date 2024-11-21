import {useIdInstanceContext} from '../../hooks/useIdInstance';
import {useApiTokenContext} from '../../hooks/useApiToken';
import {useContactsContext} from '../../hooks/useContacts';

export default function ChatList() {
  const { idInstance, setIdInstance } = useIdInstanceContext();
  const { apiToken, setApiToken } = useApiTokenContext();
  const { contacts, setContacts } = useContactsContext();
  const addContact = () => {

  }

  return <div className={'scene'}>
    {contacts.length === 0
      ? <>
          <h2 className={'chat-list__text'}>{'Начните переписку'}</h2>
          <button className={'btn'} onClick={addContact}>{'создать чат'}</button>
        </>
      : <div>
        {contacts.map((contact, index) => {
          return <div key={`contact-${index}`}></div>
        })}
      </div>
   }
  </div>
}