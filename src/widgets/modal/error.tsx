import './style.scss';
import {useErrorsContext} from '../../hooks/useError';
import React, {useEffect, useState} from 'react';
import CloseButton from '../close-button';

function BadResponseError(props: {error: Response}) {
  const [body, setBody] = useState<string | null>(null);

  useEffect(() => {
    props.error.json().then(value => {
      setBody(JSON.stringify(value));
    }, () => {});
  }, [props.error]);

  return <p style={{wordBreak: 'break-all'}}>
    {props.error.statusText}
    {!!body && body}
  </p>;
}

function Error(props: {error: unknown}) {
  if (props.error instanceof Response) {
    return <BadResponseError error={props.error as Response} />;
  }

  return <p>{'Unknown error happened'}</p>;
}

export default function ModalError() {
  const {errors, setErrors} = useErrorsContext();

  const onClose = (error: unknown) => {
    setErrors(errors.filter((err) => err === error));
  };

  return <div className={'error'}>
    {errors.map((error, index) => {
      return <div key={`error-${index}`}>
        <Error error={error}/>
      </div>
    })}
    <CloseButton className={'btn btn__icon modal__exit'} onClick={onClose}/>
  </div>;
}