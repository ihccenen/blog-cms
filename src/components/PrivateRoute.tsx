import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../context/userContext';

export default function PrivateRoute() {
  const { user } = useContext(UserContext);

  return user ? <Outlet /> : <Navigate to="/login" replace/>;
}
