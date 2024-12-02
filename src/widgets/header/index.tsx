import './style.scss';
import {useNavigate} from 'react-router-dom';

export default function Header(props: any) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    }
  };

  return <div className={'header'}>

    {window.history.length && <button className={'header__btn_back btn'} onClick={handleGoBack}>{'назад'}</button>}

    <div className={'header__text'}>
      {props.title}
    </div>
  </div>
}