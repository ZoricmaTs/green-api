import './style.scss';
import {forwardRef, InputHTMLAttributes, useImperativeHandle, useRef} from 'react';

export type TextAreaProps = InputHTMLAttributes<HTMLTextAreaElement> & {
  label?: string,
  value?: string,
  placeholder?: string,
  onValueChange?: (value: string) => void,
  name: string,
  row?: number,
}

export type TextAreaHandler = {
  setValue: (newValue: string) => void;
}

const TextArea = forwardRef(function(props: TextAreaProps, ref) {
  const innerRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(ref, (): TextAreaHandler => {
    return {
      setValue(newValue: string) {
        if (innerRef.current) {
          innerRef.current.value = newValue;
        }
      }
    }
  })

  return <textarea aria-multiline={true} name={props.name} rows={props.row} className={'text-area'} ref={innerRef}/>
});

export default TextArea;