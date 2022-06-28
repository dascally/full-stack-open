import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const UsersSummary = () => {
  const users = useSelector((state) => state.users);

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
              <td>
                <Link to={user.id}>{user.name}</Link>
              </td>
              <td style={{ textAlign: 'center' }}>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UsersSummary;
