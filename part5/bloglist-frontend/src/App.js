import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import * as blogService from './services/blogs';
import * as loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLoginSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const user = await loginService.login(username, password);

      setUser(user);
      setUsername('');
      setPassword('');
    } catch (err) {
      console.error('Invalid credentials:', err.message);
    }
  };

  return (
    <>
      {user === null ? (
        <>
          <h2>Log in</h2>
          <form onSubmit={handleLoginSubmit}>
            <div>
              <label htmlFor='username'>Username</label>
              <input
                type='text'
                name='username'
                required
                value={username}
                onChange={(evt) => {
                  setUsername(evt.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                name='password'
                required
                value={password}
                onChange={(evt) => {
                  setPassword(evt.target.value);
                }}
              />
            </div>
            <div>
              <button type='submit'>Login</button>
            </div>
          </form>
        </>
      ) : (
        <>
          <h2>Blogs</h2>
          <p>{user.name} is logged in.</p>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </>
  );
};

export default App;
