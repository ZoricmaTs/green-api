import Input, {InputProps} from './index';
import {AsYouType, parsePhoneNumberFromString} from 'libphonenumber-js';
import {useState} from 'react';

export default function PhoneInput(props: InputProps) {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleChange = (value: string): string => {
    const formatter = new AsYouType("RU");
    const formattedNumber = formatter.input(value);

    setPhoneNumber(formattedNumber);

    const parsedNumber = parsePhoneNumberFromString(formattedNumber, "RU");

    setIsValid(parsedNumber?.isValid() ?? false);
    props.onValueChange?.(value)

    return parsedNumber?.isValid() ? '' : 'Номер телефона некорректен';
  };


  return <>
    <Input rules={props.rules} label={props.label} name={props.name}
           placeholder={`Номер телефона начинается с +`} validator={handleChange}/>
    <p>Example: +78005553535</p>
  </>
}