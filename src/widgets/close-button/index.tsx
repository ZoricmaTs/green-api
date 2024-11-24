import {HTMLProps} from 'react';

export default function CloseButton(props: HTMLProps<HTMLButtonElement>) {
  return <button className={props.className} onClick={(e) => {e.stopPropagation(); props.onClick?.(e);}}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              className="lucide lucide-x fill-white flex-shrink-0">
    <path d="M18 6 6 18"></path>
    <path d="m6 6 12 12"></path>
  </svg>
  </button>;
}