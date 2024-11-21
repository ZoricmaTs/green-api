import {InputHTMLAttributes, useRef, useState} from 'react';
import './style.scss';

export enum InputType {
  TEXT = 'text',
  NUMBER = 'number',
}

export type RulesInput = {
  type: InputType,
  minLength?: number,
  maxLength?: number,
  required?: boolean,
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string,
  value?: string,
  placeholder?: string,
  onValueChange?: (value: string) => void,
  name: string,
  rules: RulesInput,
}

function validate(rules: RulesInput, value: any): string {
  if (rules.required && value.length === 0) {
    return 'Required field';
  }

  if (rules.minLength && value.length < rules.minLength) {
    return `Too short. Min length ${rules.minLength}`;
  }

  if (rules.maxLength && value.length > rules.maxLength) {
    return `Too long. Min length ${rules.maxLength}`;
  }

  return '';
}

export default function Input(props: InputProps) {
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('handleChange')
    e.stopPropagation();
    const value = e.target.value;

    if (inputRef.current) {
      inputRef.current.value = value;

      props.onValueChange?.(value);

      const validationError = validate(props.rules, value);
      inputRef.current.setCustomValidity(validationError);
      setError(validationError || null);
      console.log('error', error, inputRef.current.validity)
    }
  };

  return <div className={'input'}>
    {props.label && <label className={'input__label'}>{props.label}</label>}
    <input
      className={'input__text'}
      type={props.rules.type}
      value={props.value}
      placeholder={props.placeholder}
      name={props.name}
      ref={inputRef}
      required={props.rules.required ?? props.rules.required}
      onInput={handleChange}
    />

    {error && <div className={'input__error-message'}>{error}</div>}
  </div>
}