import './style.scss';
import Input, {InputType, RulesInput} from '../../widgets/input';
import React, {FormEvent} from 'react';
import {useNavigate} from 'react-router-dom';
import {useIdInstanceContext} from '../../hooks/useIdInstance';
import {useApiTokenContext} from '../../hooks/useApiToken';
import {useApiUrlContext} from '../../hooks/useApiUrl';
import {createPortal} from 'react-dom';
import ModalError from '../../widgets/modal/error';
import {useErrorsContext} from '../../hooks/useError';

export type InputDataType = {
  label?: string,
  value?: string,
  placeholder?: string,
  name: string,
  rules: RulesInput,
}

export default function Authentication() {
  const navigate = useNavigate();

  const { setIdInstance } = useIdInstanceContext();
  const { setApiToken } = useApiTokenContext();
  const { setApiUrl } = useApiUrlContext();
  const { errors } = useErrorsContext();

  const onAuthentication = (e: FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData: {[key: string]: string} = {};

    new FormData(form).forEach((value, key) => {
      if (typeof value === 'string') {
        formData[key] = value;
      }
    });

    setIdInstance(formData['idInstance']);
    setApiToken(formData['apiTokenInstance']);
    setApiUrl(formData['apiUrl']);

    navigate('/chat-list/');
  }

  const inputs: InputDataType[] = [
    {
      label: 'idInstance',
      name: 'idInstance',
      placeholder: 'Введите свой idInstance',
      rules: {
        type: InputType.TEXT,
        required: true,
      }
    },
    {
      label: 'apiTokenInstance',
      name: 'apiTokenInstance',
      placeholder: 'Введите свой apiTokenInstance',
      rules: {
        type: InputType.TEXT,
        required: true,
      }
    },
    {
      label: 'apiUrl',
      name: 'apiUrl',
      placeholder: 'Введите свой apiUrl',
      rules: {
        type: InputType.URL,
        required: true,
      }
    }
  ];

  return <div className={'scene'}>
    <form onSubmit={onAuthentication}>
      {inputs.map((input: InputDataType, index: number) => {
        return <Input {...input} key={`input-${index}`}/>
      })}
      <button className={'btn'} type={'submit'}>{'подключиться'}</button>
    </form>

    {errors.length > 0 && createPortal(<ModalError/>, document.getElementById('modal-wrapper')!)}
  </div>
}