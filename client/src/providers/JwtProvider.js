import { useEffect } from 'react';
import useQuery from '../hooks/useQuery';
import { setSession } from '../utils/jwt';
import { initialize } from '../redux/slices/auth';
import { useDispatch } from 'react-redux';

export default function JwtProvider({ children }) {
  const dispatch = useDispatch();
  const { fetchData } = useQuery({
    url: '/jwtVerify',
    onSuccess: (res) => {
      console.log(res);
      dispatch(initialize(res.user));
    },
  });
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setSession(token);
    fetchData();
  }, []);

  return <>{children}</>;
}
