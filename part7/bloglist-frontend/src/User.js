import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const User = () => {
  const params = useParams();
  const user = useSelector((state) =>
    state.users.find((user) => user.id === params.userId)
  );

  return (
    <>
      {!user ? (
        <p>User not found.</p>
      ) : (
        <>
          <h2>{user.name}</h2>
          <h3>Blog posts</h3>
          <ul>
            {user.blogs.map((blog) => (
              <li key={blog.id}>{blog.title}</li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default User;
