import {FormEvent, useEffect} from 'react';
import './style.scss';
import {InputType} from '../input';
import PhoneInput from '../input/phoneInput';

export default function Modal(props: any) {
  const { onClose, addContact } = props;

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    }
  }, []);

  const handleAddContact = (e: FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData: {[key: string]: string} = {};

    new FormData(form).forEach((value, key) => {
      if (typeof value === 'string') {
        formData[key] = value;
      }
    });

    addContact?.(formData['phone']);
  }

  return <div className={'modal'}>
    <form className={'modal__form'} onSubmit={handleAddContact}>
      <PhoneInput
        rules={{required: true, type: InputType.PHONE}}
        label={'телефон'}
        name={'phone'}
      />
      <button type={'submit'} className={'modal__form_submit-btn btn'}>{'add'}</button>
    </form>

    <button type={'button'} onClick={onClose} className={'modal__exit btn'}>{'close'}</button>
  </div>
}