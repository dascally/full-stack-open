import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from './reducers/usersSlice';

const Users = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Blog posts created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td style={{ textAlign: 'center' }}>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
