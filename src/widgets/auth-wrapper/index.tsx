import {useIdInstanceContext} from '../../hooks/useIdInstance';
import {useApiTokenContext} from '../../hooks/useApiToken';
import {PropsWithChildren} from 'react';
import {Navigate} from 'react-router-dom';

export default function AuthWrapper(props: PropsWithChildren) {
  const { idInstance } = useIdInstanceContext();
  const { apiToken } = useApiTokenContext();

  if (!idInstance || !apiToken) {
    return <Navigate to={'/'}/>;
  }

  return <>{props.children}</>;
}