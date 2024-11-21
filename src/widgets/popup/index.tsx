import './style.scss';
export type PopupData = {
  title: string,
  text: string,

}

export default function Popup(props: {data: PopupData}) {
  return <div className={'popup'}>

  </div>
}