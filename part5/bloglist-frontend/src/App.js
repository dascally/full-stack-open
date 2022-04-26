import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import Toggleable from './components/Toggleable';
import NewPostForm from './components/NewPostForm';
import * as blogService from './services/blogs';
import * as loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [createPostIsVisible, setCreatePostIsVisible] = useState(false);
  const [notification, setNotification] = useState(null);
  const [notificationTimerId, setNotificationTimerId] = useState(null);

  const showNotification = (message) => {
    clearTimeout(notificationTimerId);

    setNotification(message);

    const timerId = setTimeout(() => {
      setNotification(null);
      setNotificationTimerId(null);
    }, 3000);
    setNotificationTimerId(timerId);
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const userJson = localStorage.getItem('user');

    if (userJson) {
      const user = JSON.parse(userJson);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLoginSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const user = await loginService.login(username, password);

      setUser(user);
      blogService.setToken(user.token);
      setUsername('');
      setPassword('');

      localStorage.setItem('user', JSON.stringify(user));

      showNotification(`User ${user.name} logged in.`);
    } catch (err) {
      console.error('Invalid credentials:', err.message);
      showNotification(`Invalid credentials: ${err.message}`);
    }
  };

  const handleLogoutClick = (evt) => {
    showNotification(`User ${user.name} logged out.`);
    setUser(null);
    blogService.setToken(null);
    localStorage.removeItem('user');
  };

  const createPost = async ({ title, author, url }) => {
    try {
      const newBlog = await blogService.create({ title, author, url });

      setBlogs([...blogs, newBlog]);
      showNotification(`New blog post, ${title}, by ${author}, created.`);

      setCreatePostIsVisible(false);
    } catch (err) {
      console.error('Error creating new post:', err.message);
      showNotification(`Error creating new blog post: ${err.message}`);
    }
  };

  return (
    <>
      {user === null ? (
        <>
          <h2>Log in</h2>
          <Notification message={notification} />
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
          <Notification message={notification} />
          <p>
            {user.name} is logged in.{' '}
            <button type='button' onClick={handleLogoutClick}>
              Logout
            </button>
          </p>
          <h3>Blog list</h3>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
          <Toggleable
            buttonLabel='Create new post'
            visible={createPostIsVisible}
            setVisible={setCreatePostIsVisible}
          >
            <h3>Create new post</h3>
            <NewPostForm createPost={createPost} />
          </Toggleable>
        </>
      )}
    </>
  );
};

export default App;
