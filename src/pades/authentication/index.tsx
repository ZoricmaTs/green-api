import './style.scss';
import Input, {InputType, RulesInput} from '../../widgets/input';
import {FormEvent} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppContext} from '../../hooks/useidInstance';

export type InputDataType = {
  label?: string,
  value?: string,
  placeholder?: string,
  name: string,
  rules: RulesInput,
}

export default function Authentication() {
  const navigate = useNavigate();
  const { idInstance, apiTokenInstance, setIdInstance, setApiTokenInstance } = useAppContext();

  const onAuthentication = (e: FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData: {[key: string]: string} = {};

    new FormData(form).forEach((value, key) => {
      if (typeof value === 'string') {
        formData[key] = value;
      }
    });

    setIdInstance(Number(formData['idInstance']));
    setApiTokenInstance(formData['apiTokenInstance']);

    navigate('/chat-list/');
  }

  const inputs: InputDataType[] = [
    {
      label: 'idInstance',
      name: 'idInstance',
      placeholder: 'Введите свой idInstance',
      rules: {
        type: InputType.NUMBER,
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
    }
  ];

  return <div className={'scene'}>
    <form onSubmit={onAuthentication}>
      {inputs.map((input: InputDataType, index: number) => {
        return <Input {...input} key={`input-${index}`}/>
      })}
      <button className={'btn'} type={'submit'}>{'подключиться'}</button>
    </form>
  </div>
}