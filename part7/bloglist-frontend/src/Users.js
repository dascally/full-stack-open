import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUsers } from './reducers/usersSlice';
import { Outlet } from 'react-router-dom';

const Users = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return <Outlet />;
};

export default Users;
